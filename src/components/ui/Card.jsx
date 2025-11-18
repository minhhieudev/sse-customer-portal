import clsx from "clsx";

export function Card({ children, className }) {
  return (
    <div className={clsx("rounded-xl border bg-white text-gray-900 shadow", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={clsx("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={clsx("font-semibold leading-none tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={clsx("text-sm text-gray-500", className)}>{children}</p>;
}

export function CardContent({ children, className }) {
  return <div className={clsx("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={clsx("flex items-center p-6 pt-0", className)}>{children}</div>;
}
