import type { AccountFieldErrors, AccountRecord } from "../types/accounts";

const MAX_LABELS_RAW = 50;
const MAX_LOGIN = 100;
const MAX_PASSWORD = 100;

export function validateAccount(params: {
    labelsRaw: string;
    recordDraft: AccountRecord;
}):AccountFieldErrors {
    const {labelsRaw, recordDraft} = params;
    const errors: AccountFieldErrors = {};

    if(labelsRaw.length > MAX_LABELS_RAW) {
        errors.labels = `Максимум ${MAX_LABELS_RAW} символов`;
    }

    const login = recordDraft.login.trim();
    if (!login) errors.login = 'Обязательное поле';
    else if (login.length > MAX_LOGIN) errors.login = `Максимум ${MAX_LOGIN} символов`;

    if (recordDraft.type === 'LOCAL') {
        const pwd = (recordDraft.password ?? '').trim();
        if (!pwd) errors.password = 'Обязательное поле';
        else if (pwd.length > MAX_PASSWORD) errors.password = `Максимум ${MAX_PASSWORD} символов`;
    }

    return errors;
}

export function hasErrors(e: AccountFieldErrors): boolean {
    return Boolean(e.labels || e.login || e.password);
}