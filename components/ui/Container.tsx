import { cn } from "@/utils/utils";

interface IContainer {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: IContainer) {
    return <div className={cn(' container  ml-auto mr-auto px-5 md:px-6', className)}>{children}</div>;
}