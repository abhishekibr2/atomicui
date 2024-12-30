import React, { useState, useEffect, Ref } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Settings, X, Type } from 'lucide-react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Component {
    id: string;
    type: 'h1';
    content: string;
    position: { x: number; y: number };
    height: number;
}

interface DropZone {
    x: number;
    y: number;
    id: string;
}

interface DragItem {
    type: string;
    source: 'sidebar' | 'canvas';
    componentType: 'h1';
    id?: string;
}

const GRID_SIZE = 20;
const COMPONENT_GAP = 20;

const getDropZones = (components: Component[]): DropZone[] => {
    if (components.length === 0) {
        return [{ x: 0, y: 0, id: 'initial' }];
    }

    const dropZones: DropZone[] = [];
    const sortedComponents = [...components].sort((a, b) => a.position.y - b.position.y);

    // Add a drop zone at the top if there's space
    if (sortedComponents[0]?.position.y > COMPONENT_GAP) {
        dropZones.push({
            x: 0,
            y: 0,
            id: 'dropzone-top'
        });
    }

    // Add drop zones between and after components
    sortedComponents.forEach((component, index) => {
        const nextComponent = sortedComponents[index + 1];
        const bottomY = component.position.y + component.height + COMPONENT_GAP;

        if (nextComponent) {
            // If there's enough space between this component and the next
            if (nextComponent.position.y - bottomY >= COMPONENT_GAP) {
                dropZones.push({
                    x: 0,
                    y: bottomY,
                    id: `dropzone-between-${component.id}`
                });
            }
        } else {
            // Add drop zone after the last component
            dropZones.push({
                x: 0,
                y: bottomY,
                id: `dropzone-bottom-${component.id}`
            });
        }
    });

    return dropZones;
};

const findNearestDropZone = (y: number, dropZones: DropZone[]): number => {
    if (dropZones.length === 0) return 0;

    let nearestZone = dropZones[0];
    let minDistance = Math.abs(dropZones[0].y - y);

    dropZones.forEach(zone => {
        const distance = Math.abs(zone.y - y);
        if (distance < minDistance) {
            minDistance = distance;
            nearestZone = zone;
        }
    });

    return nearestZone.y;
};

const ComponentDragItem = () => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'component',
        item: () => ({  // Use a function to ensure fresh item each time
            type: 'component',
            source: 'sidebar',
            componentType: 'h1',
            id: `temp-${Date.now()}`  // Generate temporary ID for drag operation
        }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), []);

    return (
        <div
            ref={dragRef as unknown as React.RefObject<HTMLDivElement>}
            className={`p-4 border rounded-lg cursor-move flex items-center gap-2 
                ${isDragging ? 'opacity-50' : ''}`}
        >
            <Type className="w-4 h-4" />
            <span>Heading (H1)</span>
        </div>
    );
};

const DroppedComponent = ({
    component,
    onSelect,
    onRemove,
    onHeightChange,
    onMove
}: {
    component: Component;
    onSelect: (component: Component) => void;
    onRemove: (id: string) => void;
    onHeightChange: (id: string, height: number) => void;
    onMove: (id: string, y: number) => void;
}) => {
    const componentRef = React.useRef<HTMLDivElement>(null);

    const [{ isDragging }, dragRef] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
        type: 'component',
        item: {
            type: 'component',
            source: 'canvas',
            componentType: 'h1',
            id: component.id
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        if (componentRef.current) {
            const height = componentRef.current.getBoundingClientRect().height;
            if (height !== component.height) {
                onHeightChange(component.id, height);
            }
        }
    }, [component.content, onHeightChange, component.id]);

    return (
        <div
            ref={(node) => {
                (dragRef as any)(node);
                componentRef.current = node;
            }}
            className="absolute w-full"
            style={{
                left: component.position.x,
                top: component.position.y,
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Card className="group relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 
                   transition-opacity h-6 w-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(component.id);
                    }}
                >
                    <X className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-8 opacity-0 group-hover:opacity-100 
                   transition-opacity h-6 w-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(component);
                    }}
                >
                    <Settings className="w-4 h-4" />
                </Button>
                <CardContent className="p-4">
                    <h1 className="text-4xl font-bold">{component.content}</h1>
                </CardContent>
            </Card>
        </div>
    );
};

const PageEditor = () => {
    const [components, setComponents] = useState<Component[]>([]);
    const [dropZones, setDropZones] = useState<DropZone[]>([{ x: 0, y: 0, id: 'initial' }]);
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    useEffect(() => {
        setDropZones(getDropZones(components));
    }, [components]);

    const handleSelect = (component: Component) => {
        setSelectedComponent(component);
        setIsConfigOpen(true);
    };

    const updateComponent = (updatedComponent: Component) => {
        setComponents(prevComponents =>
            prevComponents.map(comp =>
                comp.id === updatedComponent.id ? updatedComponent : comp
            )
        );
        setSelectedComponent(updatedComponent);
    };

    const removeComponent = (id: string) => {
        setComponents(prevComponents => prevComponents.filter(comp => comp.id !== id));
        if (selectedComponent?.id === id) {
            setSelectedComponent(null);
            setIsConfigOpen(false);
        }
    };

    const handleHeightChange = (id: string, height: number) => {
        setComponents(prevComponents =>
            prevComponents.map(comp =>
                comp.id === id ? { ...comp, height } : comp
            )
        );
    };

    const handleMove = (id: string, newY: number) => {
        setComponents(prevComponents =>
            prevComponents.map(comp =>
                comp.id === id ? { ...comp, position: { ...comp.position, y: newY } } : comp
            )
        );
    };

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'component',
        drop: (item: DragItem, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            const x = 0;
            const rawY = offset.y - 64;
            const snappedY = findNearestDropZone(rawY, dropZones);

            if (item.source === 'sidebar') {
                // Generate a new permanent ID for the dropped component
                const newComponent: Component = {
                    id: `component-${Date.now()}`,
                    type: 'h1',
                    content: 'New Heading',
                    position: { x, y: snappedY },
                    height: 0,
                };
                setComponents(prev => [...prev, newComponent]);
            } else if (item.source === 'canvas' && item.id) {
                setComponents(prev =>
                    prev.map(comp =>
                        comp.id === item.id
                            ? { ...comp, position: { ...comp.position, y: snappedY } }
                            : comp
                    )
                );
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }), [dropZones]);

    return (
        <div className="flex h-screen">
            <div className="w-72 border-r p-4">
                <h2 className="font-semibold mb-4">Components</h2>
                <ComponentDragItem />
            </div>

            <div
                ref={dropRef as unknown as Ref<HTMLDivElement>}
                className={`flex-1 relative overflow-auto ${isOver ? 'bg-blue-50' : ''}`}
            >
                <div className="w-full h-full p-16 relative">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Drop zones visualization */}
                    {dropZones.map((zone) => (
                        <div
                            key={zone.id}
                            className="absolute w-full h-8 border-2 border-dashed border-blue-300 bg-blue-50 bg-opacity-50"
                            style={{
                                left: zone.x,
                                top: zone.y,
                            }}
                        />
                    ))}

                    {/* Placed components */}
                    {components.map((component) => (
                        <DroppedComponent
                            key={component.id}
                            component={component}
                            onSelect={handleSelect}
                            onRemove={removeComponent}
                            onHeightChange={handleHeightChange}
                            onMove={(id, y) => {
                                setComponents(prev =>
                                    prev.map(comp =>
                                        comp.id === id
                                            ? { ...comp, position: { ...comp.position, y } }
                                            : comp
                                    )
                                );
                            }}
                        />
                    ))}
                </div>
            </div>

            <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Heading Settings</SheetTitle>
                    </SheetHeader>
                    {selectedComponent && (
                        <div className="mt-6 space-y-6">
                            <Accordion type="single" collapsible defaultValue="content">
                                <AccordionItem value="content">
                                    <AccordionTrigger>Content</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Heading Text</Label>
                                                <Input
                                                    value={selectedComponent.content}
                                                    onChange={(e) => updateComponent({
                                                        ...selectedComponent,
                                                        content: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default PageEditor;