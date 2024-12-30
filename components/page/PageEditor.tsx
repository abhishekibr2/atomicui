import React, { useState, useEffect } from 'react';
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

interface DragItem {
    type: string;
    source: 'sidebar' | 'canvas';
    componentType: 'h1';
    id?: string;
}

const GRID_SIZE = 20;
const SNAP_THRESHOLD = 20;

const findSnapPosition = (
    currentY: number,
    components: Component[],
    currentId?: string
): number => {
    console.log('findSnapPosition called with currentY:', currentY);
    console.log('Components:', components);

    const sortedComponents = [...components].sort((a, b) => a.position.y - b.position.y);
    let newY = Math.round(currentY / GRID_SIZE) * GRID_SIZE;

    for (const component of sortedComponents) {
        if (component.id === currentId) continue;

        const bottomY = component.position.y + component.height;
        console.log(`Checking ${component.id}: top=${component.position.y}, bottom=${bottomY}, newY=${newY}`);

        if (newY >= component.position.y && newY < bottomY) {
            newY = bottomY + GRID_SIZE;
            console.log(`Adjusted newY to avoid overlap: ${newY}`);
        }
    }

    console.log('Final snapped Y:', newY);
    return newY;
};


const ComponentDragItem = () => {
    const [{ isDragging }, dragRef] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
        type: 'component',
        item: {
            type: 'component',
            source: 'sidebar',
            componentType: 'h1'
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

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
    }, [component.content]);

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
                    onClick={() => onRemove(component.id)}
                >
                    <X className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-8 opacity-0 group-hover:opacity-100 
                   transition-opacity h-6 w-6"
                    onClick={() => onSelect(component)}
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
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const handleSelect = (component: Component) => {
        setSelectedComponent(component);
        setIsConfigOpen(true);
    };

    const updateComponent = (updatedComponent: Component) => {
        setComponents(components.map(comp =>
            comp.id === updatedComponent.id ? updatedComponent : comp
        ));
        setSelectedComponent(updatedComponent);
    };

    const removeComponent = (id: string) => {
        setComponents(components.filter(comp => comp.id !== id));
        if (selectedComponent?.id === id) {
            setSelectedComponent(null);
            setIsConfigOpen(false);
        }
    };

    const handleHeightChange = (id: string, height: number) => {
        setComponents(components.map(comp =>
            comp.id === id ? { ...comp, height } : comp
        ));
    };

    const handleMove = (id: string, newY: number) => {
        setComponents(components.map(comp =>
            comp.id === id ? { ...comp, position: { ...comp.position, y: newY } } : comp
        ));
    };

    const [, dropRef] = useDrop<DragItem, void, unknown>(() => ({
        accept: 'component',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            const x = 0; // Fixed X position
            const rawY = offset.y - 64; // Adjust for canvas offset

            if (item.source === 'sidebar') {
                setComponents((prevComponents) => {
                    const snappedY = findSnapPosition(rawY, prevComponents); // Use previous components
                    const newComponent: Component = {
                        id: `component-${Date.now()}`,
                        type: 'h1',
                        content: 'New Heading',
                        position: { x, y: snappedY },
                        height: 0, // Default height
                    };
                    console.log('Adding new component:', newComponent);
                    return [...prevComponents, newComponent]; // Append new component
                });
            } else if (item.source === 'canvas' && item.id) {
                setComponents((prevComponents) => {
                    const snappedY = findSnapPosition(rawY, prevComponents, item.id);
                    handleMove(item.id || "", snappedY);
                    return prevComponents;
                });
            }
        },
    }));

    return (
        <div className="flex h-screen">
            <div className="w-72 border-r bg-gray-50 p-4">
                <h2 className="font-semibold mb-4">Components</h2>
                <ComponentDragItem />
            </div>

            <div
                ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
                className="flex-1 relative overflow-auto"
            >
                <div className="w-full h-full p-16 relative">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {components.map((component) => (
                        <DroppedComponent
                            key={component.id}
                            component={component}
                            onSelect={handleSelect}
                            onRemove={removeComponent}
                            onHeightChange={handleHeightChange}
                            onMove={handleMove}
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