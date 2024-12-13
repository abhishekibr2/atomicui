import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SimpleCardConfig } from "@/types/simplecard.types";
import { cn } from "@/lib/utils";

interface SimpleCardProps {
    config: SimpleCardConfig;
}

export default function SimpleCard({ config }: SimpleCardProps) {
    const {
        heading,
        image,
        description,
        links,
        cardStyles = {},
    } = config;

    return (
        <Card className={cn(
            cardStyles.container,
            'bg-white/50 backdrop-blur-sm border border-slate-200/60',
            'transition-all duration-300 ease-in-out',
            'cursor-pointer w-[300px]',
            'hover:shadow-xl hover:-translate-y-0.5',
            'group'
        )}>
            {heading?.show && heading.text && (
                <CardHeader className={`${cardStyles.header} ${heading.className || ''} py-3`}>
                    <h3 className="text-lg font-semibold ">
                        {heading.text}
                    </h3>
                </CardHeader>
            )}

            <CardContent className={cn(cardStyles.content, 'p-3')}>
                {image?.show && image.src && (
                    <div className={cn(
                        image.containerClassName,
                        'overflow-hidden rounded-md'
                    )}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width || 280}
                            height={image.height || 200}
                            className={cn(
                                `w-full h-[200px]`,
                                image.className || '',
                                'transition-transform duration-300',
                                'group-hover:scale-105'
                            )}
                            priority={image.priority}
                            style={{ objectFit: image.objectFit || 'cover' }}
                        />
                    </div>
                )}

                {description?.show && description.text && (
                    <p className={cn(
                        'mt-2 text-sm text-gray-600',
                        description.className || '',
                        'transition-colors duration-300',
                        'group-hover:text-gray-900'
                    )}>
                        {description.text}
                    </p>
                )}
            </CardContent>

            {links?.show && links.items.length > 0 && (
                <CardFooter className={`flex gap-2 py-3 ${cardStyles.footer || ''}`}>
                    {links.items.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={cn(
                                link.variant === 'secondary'
                                    ? 'text-gray-600 hover:text-gray-800'
                                    : 'text-blue-600 hover:text-blue-800',
                                link.className || '',
                                'text-sm',
                                'transition-all duration-300',
                                'hover:underline hover:scale-105'
                            )}
                        >
                            {link.text}
                        </Link>
                    ))}
                </CardFooter>
            )}
        </Card>
    );
}
