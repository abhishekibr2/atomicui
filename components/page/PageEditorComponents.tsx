import { Type, Image, Type as TextIcon, LayoutGrid } from 'lucide-react';
import { useDrag } from 'react-dnd';

export interface DraggableComponent {
    id: string;
    type: 'h1' | 'paragraph' | 'image' | 'container-1-1' | 'container-1-2' | 'container-1-3' | 'container-2-3' | 'container-1-4' | 'container-3-1' | 'container-1-4-4' | 'container-3-4';
    icon: React.ReactNode;
    label: string;
    isContainer?: boolean;
    columns?: number[];
}

export const DRAGGABLE_COMPONENTS: DraggableComponent[] = [
    {
        id: 'container-1-1',
        type: 'container-1-1',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: 'Full Width Layout',
        isContainer: true,
        columns: [12]
    },
    {
        id: 'container-1-2',
        type: 'container-1-2',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '1/2 + 1/2 Layout',
        isContainer: true,
        columns: [6, 6]
    },
    {
        id: 'container-1-3',
        type: 'container-1-3',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '1/3 + 1/3 + 1/3 Layout',
        isContainer: true,
        columns: [4, 4, 4]
    },
    {
        id: 'container-2-3',
        type: 'container-2-3',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '2/3 + 1/3 Layout',
        isContainer: true,
        columns: [8, 4]
    },
    {
        id: 'container-1-4',
        type: 'container-1-4',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '1/4 + 3/4 Layout',
        isContainer: true,
        columns: [3, 9]
    },
    {
        id: 'container-3-1',
        type: 'container-3-1',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '3/4 + 1/4 Layout',
        isContainer: true,
        columns: [9, 3]
    },
    {
        id: 'container-1-4-4',
        type: 'container-1-4-4',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '1/4 + 1/4 + 1/4 + 1/4 Layout',
        isContainer: true,
        columns: [3, 3, 3, 3]
    },
    {
        id: 'container-3-4',
        type: 'container-3-4',
        icon: <LayoutGrid className="w-4 h-4" />,
        label: '3/4 Layout',
        isContainer: true,
        columns: [9]
    },
    {
        id: 'heading',
        type: 'h1',
        icon: <Type className="w-4 h-4" />,
        label: 'Heading (H1)'
    },
    {
        id: 'paragraph',
        type: 'paragraph',
        icon: <TextIcon className="w-4 h-4" />,
        label: 'Paragraph'
    },
    {
        id: 'image',
        type: 'image',
        icon: <Image className="w-4 h-4" />,
        label: 'Image'
    }
];

interface ComponentDragItemProps {
    component: DraggableComponent;
}

export const ComponentDragItem = ({ component }: ComponentDragItemProps) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'component',
        item: () => ({
            type: 'component',
            source: 'sidebar',
            componentType: component.type,
            id: `temp-${Date.now()}`
        }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [component]);

    return (
        <div
            ref={dragRef as unknown as React.RefObject<HTMLDivElement>}
            className={`p-4 border rounded-lg cursor-move flex items-center gap-2 
                ${isDragging ? 'opacity-50' : ''}`}
        >
            {component.icon}
            <span>{component.label}</span>
        </div>
    );
};
