export type AccountType = 'LDAP' | 'LOCAL';

export type LabelItem = { text: string }

export type AccountRecord = {
    id: string;
    labels: LabelItem[];
    type: AccountType;
    login: string;
    password: string | null;
}

export type AccountFieldErrors = Partial<{
    labels: string;
    login: string;
    password: string;
}>

export type AccountsState = {
    accounts: AccountRecord[];
    errorsById: Record<string, AccountFieldErrors>;
}

export type Field = 'labels' | 'login' | 'password' | 'type'