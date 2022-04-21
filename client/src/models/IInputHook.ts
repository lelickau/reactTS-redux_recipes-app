export interface IInpytHook {
    isEmpty: boolean;
    minLengthErr: boolean;
    emailErr: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    isDirty: boolean;
}