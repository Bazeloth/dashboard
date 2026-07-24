import { ReactNode, useId } from 'react';

interface WidgetShellProps {
    title: string;
    error: string | null;
    children: ReactNode;
}

export function WidgetShell({ title, error, children }: WidgetShellProps) {
    const headingId = useId();

    return (
        <section
            aria-labelledby={headingId}
            className={`flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 transition-shadow ${
                error ? 'ring-red-400' : 'ring-slate-200'
            }`}
        >
            <h2
                id={headingId}
                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
            >
                {title}
            </h2>
            <div className="mt-4 flex-1">{children}</div>
            <div
                role="status"
                aria-live="polite"
                className={
                    error
                        ? 'mt-4 flex items-start gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 ring-1 ring-red-200'
                        : 'sr-only'
                }
            >
                {error ? (
                    <>
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="mt-0.5 h-4 w-4 shrink-0 fill-red-600"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.75a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4zm.75 7.75a1 1 0 100-2 1 1 0 000 2z"
                            />
                        </svg>
                        <span>
                            <span className="font-medium">{error}.</span>{' '}
                            <span className="text-red-700">Retrying automatically.</span>
                        </span>
                    </>
                ) : null}
            </div>
        </section>
    );
}
