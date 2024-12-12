"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DropdownProps, DropdownSection } from "@/types/dropdown.types"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const menuItemAnimation = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.2 }
};

const contentAnimation = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
};

export function ReusableDropDown({ config, className }: DropdownProps) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const router = useRouter();
    const gridColsClass = {
        one: 'grid-cols-1',
        two: 'grid-cols-1',
        three: 'grid-cols-1'
    }

    const contentWidthClass = {
        sm: 'w-[300px]',
        md: 'w-[300px]',
        lg: 'w-[300px]'
    }

    const renderMenuItem = (section: DropdownSection, index: number) => {
        // If no items or empty items array, render as a simple link
        if (!section.items || section.items.length === 0) {
            return (
                <Link href={section.href || '#'} legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            config.styles?.trigger,
                            config.styles?.triggerInactive
                        )}
                    >
                        {section.title}
                    </NavigationMenuLink>
                </Link>
            );
        }

        // If has items, render as dropdown
        return section.href ? (
            <Link href={section.href} legacyBehavior passHref>
                <NavigationMenuLink
                    className={cn(
                        config.styles?.trigger,
                        activeIndex === index ? config.styles?.triggerActive : config.styles?.triggerInactive
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {section.title}
                </NavigationMenuLink>
            </Link>
        ) : (
            <>
                <NavigationMenuTrigger
                    className={cn(
                        config.styles?.trigger,
                        activeIndex === index ? config.styles?.triggerActive : config.styles?.triggerInactive
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                >
                    {section.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                    onMouseLeave={() => setActiveIndex(null)}
                    className={cn(config.styles?.content)}
                >
                    <motion.div
                        {...contentAnimation}
                        className={cn(
                            config.styles?.contentWrapper,
                            config.styles?.contentAnimation
                        )}
                    >
                        <ul className={cn(
                            config.styles?.contentList,
                            "grid gap-3",
                            config.layout?.contentWidth && contentWidthClass[config.layout.contentWidth],
                            config.layout?.gridCols && gridColsClass[config.layout.gridCols],
                        )}>
                            {section.items.map((item, itemIndex) => (
                                <React.Fragment key={itemIndex}>
                                    {itemIndex > 0 && (
                                        <div className={cn(config.styles?.divider)} />
                                    )}
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: itemIndex * 0.05
                                        }}
                                        className={cn(config.styles?.itemAnimation)}
                                    >
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    config.styles?.item,
                                                    "hover:" + config.styles?.itemHover,
                                                    "active:" + config.styles?.itemActive
                                                )}
                                            >
                                                <div className={cn(
                                                    config.styles?.itemTitle,
                                                    "hover:" + config.styles?.itemTitleHover
                                                )}>
                                                    {item.title}
                                                </div>
                                                {config.layout?.showDescriptions && item.description && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                        className={cn(
                                                            config.styles?.itemDescription,
                                                            "hover:" + config.styles?.itemDescriptionHover
                                                        )}
                                                    >
                                                        {item.description}
                                                    </motion.p>
                                                )}
                                            </Link>
                                        </NavigationMenuLink>
                                    </motion.li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </motion.div>
                </NavigationMenuContent>
            </>
        );
    };

    return (
        <div className={cn(config.styles?.container)}>
            <div className={cn(config.styles?.innerWrapper)}>
                {config.brand && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(config.styles?.brandWrapper)}
                    >
                        {config.brand.logo && (
                            <Image
                                src={config.brand.logo.src}
                                alt={config.brand.logo.alt}
                                onClick={() => router.push(config.brand?.websiteUrl || "/")}
                                width={config.brand.logo.width || 40}
                                height={config.brand.logo.height || 40}
                                className={cn(config.styles?.logo)}
                            />
                        )}
                        {config.brand.title && (
                            <span
                                onClick={() => router.push(config.brand?.websiteUrl || "/")}
                                className={cn(
                                    config.styles?.websiteTitle,
                                    "hover:" + config.styles?.websiteTitleHover
                                )}>
                                {config.brand.title}
                            </span>
                        )}
                    </motion.div>
                )}
                <NavigationMenu className={cn(config.styles?.menu, className)}>
                    <NavigationMenuList className={cn(config.styles?.menuList)}>
                        <AnimatePresence>
                            {config.sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    {...menuItemAnimation}
                                    className={cn(
                                        config.styles?.menuItem,
                                        config.styles?.menuAnimation
                                    )}
                                >
                                    <NavigationMenuItem>
                                        {renderMenuItem(section, index)}
                                    </NavigationMenuItem>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}
