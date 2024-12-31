"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { Settings, X, GripVertical } from 'lucide-react';
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
import { ContentConfig } from '@/schema/page';
import { DRAGGABLE_COMPONENTS, ComponentDragItem, DraggableComponent } from './PageEditorComponents';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface Component {
    id: string;
    type: DraggableComponent['type'];
    content: string;
    position: { x: number; y: number };
    height: number;
    width: number;
    minWidth?: number;
    maxWidth?: number;
    zIndex: number;
    gridColumn?: number;
    gridRow?: number;
    isContainer?: boolean;
    columns?: number[];
    children?: Component[];
}

interface DragItem {
    type: string;
    source: 'sidebar' | 'canvas';
    componentType: DraggableComponent['type'];
    id?: string;
    isContainer?: boolean;
}

interface PageEditorProps {
    content: ContentConfig[];
    onChange: (content: ContentConfig[]) => void;
}

const resizeStyles = `
  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #4f46e5;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    padding: 0;
    z-index: 40;
  }
  .react-resizable-handle-se {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }
  .react-resizable-handle-e {
    right: -5px;
    top: 50%;
    cursor: e-resize;
    transform: translateY(-50%);
  }
  .react-resizable-handle-s {
    bottom: -5px;
    left: 50%;
    cursor: s-resize;
    transform: translateX(-50%);
  }
`;

const DroppedComponent = ({
    component,
    onSelect,
    onRemove,
    onHeightChange,
    onMove,
    isLast,
    gridPosition,
    onDropInContainer
}: {
    component: Component;
    onSelect: (component: Component) => void;
    onRemove: (id: string) => void;
    onHeightChange: (id: string, height: number, width: number) => void;
    onMove: (id: string, x: number, y: number) => void;
    isLast: boolean;
    gridPosition: { column: number; row: number };
    onDropInContainer?: (containerId: string, componentData: any, columnIndex: number) => void;
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const dropElementRef = useRef<HTMLDivElement | null>(null);

    const [{ isDragging: isBeingDragged }, dragRef] = useDrag(() => ({
        type: 'component',
        item: {
            type: 'component',
            source: 'canvas',
            componentType: component.type,
            id: component.id,
            isContainer: component.isContainer,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [component]);

    const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
        accept: 'component',
        canDrop: (item) => {
            // Don't allow dropping containers inside containers
            if (component.isContainer && item.isContainer) return false;
            // Don't allow dropping into itself
            if (item.id === component.id) return false;
            return Boolean(component.isContainer);
        },
        drop: (item: DragItem, monitor) => {
            if (!component.isContainer || !onDropInContainer) return;

            const dropTargetElement = dropElementRef.current;
            if (!dropTargetElement) return;

            const dropTargetRect = dropTargetElement.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const columnWidth = dropTargetRect.width / (component.columns?.length || 1);
            const columnIndex = Math.floor((clientOffset.x - dropTargetRect.left) / columnWidth);

            onDropInContainer(component.id, item, columnIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [component, onDropInContainer]);

    const renderComponent = () => {
        if (component.isContainer) {
            return (
                <div className="w-full flex gap-2 min-h-[100px]">
                    {component.columns?.map((columnWidth, index) => (
                        <div
                            key={index}
                            className={`border border-dashed border-gray-200 rounded-lg p-2 transition-colors w-full
                                ${isOver ? 'bg-blue-50/50' : ''}`}
                            style={{ flex: columnWidth }}
                        >
                            <div className="text-xs text-gray-400 mb-1 text-center">
                                {Math.round((columnWidth / 12) * 100)}% Width
                            </div>
                            <div className="space-y-2">
                                {component.children?.filter(child => child.gridColumn === index).map(child => (
                                    <DroppedComponent
                                        key={child.id}
                                        component={child}
                                        onSelect={onSelect}
                                        onRemove={onRemove}
                                        onHeightChange={onHeightChange}
                                        onMove={onMove}
                                        isLast={false}
                                        gridPosition={{ column: 1, row: 1 }}
                                        onDropInContainer={onDropInContainer}
                                    />
                                ))}
                            </div>
                            {(!component.children || !component.children.some(child => child.gridColumn === index)) && (
                                <div className="h-full min-h-[60px] flex items-center justify-center text-gray-400">
                                    Drop components here
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        switch (component.type) {
            case 'h1':
                return <h1 className="text-4xl font-bold w-full">{component.content}</h1>;
            case 'paragraph':
                return <p className="text-base w-full">{component.content}</p>;
            case 'image':
                return (
                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            src={component.content}
                            alt="Dropped image"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const handleResize = (e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
        e.stopPropagation();
        if (!isDragging) {
            onHeightChange(component.id, size.height, size.width);
        }
    };

    const combinedRef = (node: HTMLDivElement | null) => {
        dropElementRef.current = node;
        if (!component.isContainer) {
            dragRef(node);
        } else {
            dropRef(node);
            // Make container draggable by its header
            const header = node?.querySelector('.drag-handle') as HTMLElement;
            if (header) {
                dragRef(header);
            }
        }
    };

    return (
        <div
            ref={combinedRef}
            className={`relative transition-all duration-200 w-full mb-2 ${isBeingDragged ? 'opacity-50' : ''}`}
            style={{
                width: '100%',
                height: component.isContainer ? 'auto' : component.height,
            }}
        >
            {component.isContainer ? (
                <Card className="group relative border border-transparent hover:border-blue-500 w-full">
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 
                        transition-opacity bg-white rounded-bl-lg border-l border-b z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(component.id);
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <CardContent className="p-2">
                        {renderComponent()}
                    </CardContent>
                </Card>
            ) : (
                <Card className="group relative h-full border border-transparent hover:border-blue-500 w-full cursor-move">
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 
                        transition-opacity bg-white rounded-bl-lg border-l border-b z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(component);
                            }}
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(component.id);
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <CardContent className="p-2 h-full">
                        {renderComponent()}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

const PageEditor = ({ content, onChange }: PageEditorProps) => {
    const [components, setComponents] = useState<Component[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [count, setCount] = useState(1);
    const [maxZIndex, setMaxZIndex] = useState(1);
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    // Transform components to ContentConfig format
    const transformToContentConfig = (components: Component[]): ContentConfig[] => {
        const transformComponent = (component: Component): ContentConfig => {
            const baseConfig = {
                id: component.id,
                content: component.content,
                position: component.position,
                height: component.height,
                width: component.width,
                zIndex: component.zIndex,
                gridColumn: component.gridColumn,
                gridRow: component.gridRow,
            };

            if (component.isContainer) {
                return {
                    type: component.type,
                    name: `Container ${component.type}`,
                    config: {
                        ...baseConfig,
                        columns: component.columns,
                        children: component.children?.map(child => transformComponent(child)) || []
                    }
                };
            }

            return {
                type: component.type,
                name: `${component.type.charAt(0).toUpperCase() + component.type.slice(1)} Component`,
                config: baseConfig
            };
        };

        return components.map(transformComponent);
    };

    // Update components when content prop changes
    useEffect(() => {
        if (!content || isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Transform ContentConfig back to Component format
        const transformToComponent = (config: ContentConfig): Component => {
            const baseComponent = {
                id: config.config.id || `component-${Date.now()}`,
                type: config.type as DraggableComponent['type'],
                content: config.config.content || '',
                position: config.config.position || { x: 0, y: 0 },
                height: config.config.height || 100,
                width: config.config.width || 800,
                zIndex: config.config.zIndex || 1,
                gridColumn: config.config.gridColumn,
                gridRow: config.config.gridRow,
            };

            if (config.type.startsWith('container-')) {
                return {
                    ...baseComponent,
                    isContainer: true,
                    columns: config.config.columns || [12],
                    children: config.config.children?.map(transformToComponent) || []
                };
            }

            return baseComponent;
        };

        const newComponents = content.map(transformToComponent);
        if (JSON.stringify(newComponents) !== JSON.stringify(components)) {
            setComponents(newComponents);
        }
    }, [content]);

    // Notify parent of changes
    const notifyChanges = () => {
        const contentConfig = transformToContentConfig(components);
        console.log('Current Page Content:', contentConfig);
        onChange(contentConfig);
    };

    // Update components and notify parent
    const updateComponentsAndNotify = (newComponents: Component[]) => {
        setComponents(newComponents);
        const contentConfig = transformToContentConfig(newComponents);
        console.log('Current Page Content:', contentConfig);
        onChange(contentConfig);
    };

    const handleSelect = (component: Component) => {
        console.log('Selected component:', component);
        setSelectedComponent(component);
        setIsConfigOpen(true);
    };

    const updateComponent = (updatedComponent: Component) => {
        const updateComponentInTree = (components: Component[]): Component[] => {
            return components.map(comp => {
                if (comp.id === updatedComponent.id) {
                    return updatedComponent;
                }
                if (comp.children) {
                    return {
                        ...comp,
                        children: updateComponentInTree(comp.children)
                    };
                }
                return comp;
            });
        };

        const newComponents = updateComponentInTree(components);
        console.log('Updating component:', updatedComponent);
        console.log('New components state:', newComponents);
        
        setComponents(newComponents);
        setSelectedComponent(updatedComponent);
        
        // Notify parent of changes
        const contentConfig = transformToContentConfig(newComponents);
        onChange(contentConfig);
    };

    const removeComponent = (id: string) => {
        const newComponents = components.filter(comp => {
            // First try to remove from root level
            if (comp.id === id) return false;

            // If not found at root level, look inside containers
            if (comp.children) {
                comp.children = comp.children.filter(child => child.id !== id);
            }
            return true;
        });

        updateComponentsAndNotify(newComponents);

        // Clear selection if the removed component was selected
        if (selectedComponent?.id === id) {
            setSelectedComponent(null);
            setIsConfigOpen(false);
        }
    };

    const handleDropInContainer = (containerId: string, item: DragItem, columnIndex: number) => {
        // Only allow non-container components to be dropped into containers
        if (item.isContainer) return;

        if (item.source === 'sidebar') {
            const defaultContent: Record<string, string> = {
                h1: `New Heading ${count}`,
                paragraph: 'New paragraph text',
                image: 'https://placehold.co/400x400'
            };

            const dropTargetRect = dropAreaRef.current?.getBoundingClientRect();
            const containerWidth = dropTargetRect?.width || 800;

            const newComponent: Component = {
                id: `component-${Date.now()}`,
                type: item.componentType,
                content: defaultContent[item.componentType] || '',
                position: { x: 0, y: 0 },
                height: 100,
                width: containerWidth,
                minWidth: containerWidth,
                maxWidth: containerWidth,
                zIndex: maxZIndex + 1,
                gridColumn: columnIndex
            };

            const newComponents = components.map(comp =>
                comp.id === containerId
                    ? { ...comp, children: [...(comp.children || []), newComponent] }
                    : comp
            );

            updateComponentsAndNotify(newComponents);
            setCount(count + 1);
            setMaxZIndex(prev => prev + 1);
        } else if (item.source === 'canvas' && item.id) {
            // Only allow moving non-container components between sections
            if (item.isContainer) return;

            let movedComponent: Component | undefined;

            // Remove component from its current location and add to new container
            const newComponents = components.map(comp => {
                if (comp.children) {
                    const childIndex = comp.children.findIndex(child => child.id === item.id);
                    if (childIndex !== -1) {
                        movedComponent = { ...comp.children[childIndex] };
                        comp.children = comp.children.filter(child => child.id !== item.id);
                    }
                }
                return comp;
            });

            // If component was found in a container, add it to the new container
            if (movedComponent) {
                const finalComponents = newComponents.map(comp =>
                    comp.id === containerId
                        ? {
                            ...comp,
                            children: [...(comp.children || []), {
                                ...movedComponent!,
                                gridColumn: columnIndex
                            }]
                        }
                        : comp
                );
                updateComponentsAndNotify(finalComponents);
            }

            // If component was at root level, move it to container
            const rootComponent = components.find(comp => comp.id === item.id);
            if (rootComponent && !rootComponent.isContainer) {
                const finalComponents = components
                    .filter(comp => comp.id !== item.id)
                    .map(comp =>
                        comp.id === containerId
                            ? {
                                ...comp,
                                children: [...(comp.children || []), {
                                    ...rootComponent,
                                    gridColumn: columnIndex
                                }]
                            }
                            : comp
                    );
                updateComponentsAndNotify(finalComponents);
            }
        }
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item: DragItem, monitor) => {
            const dropAreaRect = dropAreaRef.current?.getBoundingClientRect();
            if (!dropAreaRect) return;

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            // Only allow dropping non-container components from sidebar
            if (item.source === 'sidebar') {
                const component = DRAGGABLE_COMPONENTS.find(c => c.type === item.componentType);
                if (!component) return;

                // If it's a container component, allow dropping only at root level
                if (component.isContainer) {
                    const newComponent: Component = {
                        id: `component-${Date.now()}`,
                        type: item.componentType,
                        content: '',
                        position: { x: 0, y: 0 },
                        height: component.isContainer ? 200 : 100,
                        width: dropAreaRect.width,
                        minWidth: dropAreaRect.width,
                        maxWidth: dropAreaRect.width,
                        zIndex: maxZIndex + 1,
                        isContainer: component.isContainer,
                        columns: component.columns,
                        children: []
                    };

                    setComponents(prev => [...prev, newComponent]);
                    setCount(count + 1);
                    setMaxZIndex(prev => prev + 1);
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }), [components, count, maxZIndex]);

    const combineRefs = (element: HTMLDivElement | null) => {
        dropAreaRef.current = element;
        drop(element);
    };

    return (
        <>
            <style>{resizeStyles}</style>
            <div className="flex h-screen">
                {/* Left Sidebar - Layouts */}
                <div className="w-72 border-r p-4 bg-gray-50">
                    <h2 className="font-semibold mb-4">Layouts</h2>
                    <div className="space-y-2">
                        <div className="text-xs text-gray-500 mb-2">Basic Layouts</div>
                        {DRAGGABLE_COMPONENTS.filter(c =>
                            c.isContainer &&
                            ['container-1-1', 'container-1-2', 'container-1-3', 'container-2-3'].includes(c.type)
                        ).map((component) => (
                            <ComponentDragItem
                                key={component.id}
                                component={component}
                            />
                        ))}
                        <div className="text-xs text-gray-500 mt-4 mb-2">Advanced Layouts</div>
                        {DRAGGABLE_COMPONENTS.filter(c =>
                            c.isContainer &&
                            !['container-1-1', 'container-1-2', 'container-1-3', 'container-2-3'].includes(c.type)
                        ).map((component) => (
                            <ComponentDragItem
                                key={component.id}
                                component={component}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-auto bg-gray-100">
                    <div
                        ref={combineRefs}
                        className={`max-w-4xl mx-auto my-8 p-8 min-h-[800px] bg-white rounded-lg shadow-sm
                            ${isOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                    >
                        <div className="space-y-4">
                            {components.map((component, index) => (
                                <DroppedComponent
                                    key={component.id}
                                    component={component}
                                    onSelect={handleSelect}
                                    onRemove={removeComponent}
                                    onHeightChange={(id, height, width) => {
                                        setComponents(prev =>
                                            prev.map(comp =>
                                                comp.id === id
                                                    ? { ...comp, height, width }
                                                    : comp
                                            )
                                        );
                                    }}
                                    onMove={(id, x, y) => {
                                        setComponents(prev =>
                                            prev.map(comp =>
                                                comp.id === id
                                                    ? {
                                                        ...comp,
                                                        position: { x, y },
                                                        zIndex: maxZIndex + 1
                                                    }
                                                    : comp
                                            )
                                        );
                                        setMaxZIndex(prev => prev + 1);
                                    }}
                                    isLast={index === components.length - 1}
                                    gridPosition={{ column: 1, row: index + 1 }}
                                    onDropInContainer={handleDropInContainer}
                                />
                            ))}
                            {components.length === 0 && (
                                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                    Drag and drop layouts or components here
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Components */}
                <div className="w-72 border-l p-4 bg-gray-50">
                    <h2 className="font-semibold mb-4">Components</h2>
                    <div className="space-y-2">
                        {DRAGGABLE_COMPONENTS.filter(c => !c.isContainer).map((component) => (
                            <ComponentDragItem
                                key={component.id}
                                component={component}
                            />
                        ))}
                    </div>
                </div>

                {/* Settings Sheet */}
                <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                    <SheetContent side="right" className="w-[400px]">
                        <SheetHeader>
                            <SheetTitle>
                                {selectedComponent?.type === 'h1' && 'Heading Settings'}
                                {selectedComponent?.type === 'paragraph' && 'Paragraph Settings'}
                                {selectedComponent?.type === 'image' && 'Image Settings'}
                            </SheetTitle>
                        </SheetHeader>
                        {selectedComponent && (
                            <div className="mt-6 space-y-6">
                                <Accordion type="single" collapsible defaultValue="content">
                                    <AccordionItem value="content">
                                        <AccordionTrigger>Content</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>
                                                        {selectedComponent.type === 'h1' && 'Heading Text'}
                                                        {selectedComponent.type === 'paragraph' && 'Paragraph Text'}
                                                        {selectedComponent.type === 'image' && 'Image URL'}
                                                    </Label>
                                                    <Input
                                                        value={selectedComponent.content || ''}
                                                        onChange={(e) => {
                                                            console.log('Input change:', e.target.value);
                                                            updateComponent({
                                                                ...selectedComponent,
                                                                content: e.target.value
                                                            });
                                                        }}
                                                        placeholder={
                                                            selectedComponent.type === 'h1' ? 'Enter heading text' :
                                                            selectedComponent.type === 'paragraph' ? 'Enter paragraph text' :
                                                            'Enter image URL'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="dimensions">
                                        <AccordionTrigger>Dimensions</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Height (px)</Label>
                                                        <Input
                                                            type="number"
                                                            value={selectedComponent.height}
                                                            onChange={(e) => updateComponent({
                                                                ...selectedComponent,
                                                                height: Number(e.target.value)
                                                            })}
                                                            min={50}
                                                            step={10}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Width (px)</Label>
                                                        <Input
                                                            type="number"
                                                            value={selectedComponent.width}
                                                            onChange={(e) => updateComponent({
                                                                ...selectedComponent,
                                                                width: Number(e.target.value)
                                                            })}
                                                            min={50}
                                                            step={10}
                                                        />
                                                    </div>
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
        </>
    );
};

export default PageEditor;