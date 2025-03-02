export type TSortParam = string | number | Date | boolean | undefined | null;
export declare const commonUtils: {
    sort: ({ a, b, type }: {
        a: TSortParam;
        b: TSortParam;
        type: "string" | "number" | "dateString" | "boolean";
    }) => number;
};
