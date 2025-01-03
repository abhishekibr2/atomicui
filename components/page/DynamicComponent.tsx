import React from 'react';
import Image from 'next/image';
import { TableComponent } from "@/components/ReusableUI/Table/Table";

interface DynamicComponentProps {
    type: string;
    name: string;
    config: {
        content: string;
        height: number;
        width: number;
        id: string;
        columns?: number[];
        children?: any[];
        gridColumn?: number;
        gridRow?: number;
    };
}

export default function DynamicComponent({ type, config }: DynamicComponentProps) {
    const renderComponent = () => {
        switch (type) {
            case 'h1':
                return <h1 className="text-4xl font-bold mb-4">{config.content}</h1>;
            case 'h2':
                return <h2 className="text-3xl font-semibold mb-3">{config.content}</h2>;
            case 'paragraph':
                return <p className="text-base mb-4">{config.content}</p>;
            case 'image':
                return (
                    <div className="relative w-full" style={{ height: config.height || 300 }}>
                        <Image 
                            src={config.content} 
                            alt="Content image"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                );
            case 'table':
                const tableConfig = config.content ? JSON.parse(config.content) : null;
                if (!tableConfig) return null;
                
                return (
                    <div className="w-full" style={{ height: config.height || 600 }}>
                        <TableComponent 
                            config={tableConfig}
                            populate={{
                                fieldName: "filters",
                                source: "name",
                                endpoint: "Filters"
                            }}
                            endpoint="Users"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div 
            className="w-full" 
            id={config.id}
            style={{
                height: type === 'table' ? config.height || 600 : 'auto'
            }}
        >
            {renderComponent()}
        </div>
    );
} 