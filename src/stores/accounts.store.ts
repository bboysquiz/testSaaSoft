import { defineStore } from 'pinia'
import type { AccountFieldErrors, AccountRecord, AccountType, AccountsState, Field } from '@/shared/types/accounts'
import { parseLabels } from '@/shared/utils/labels';
import { hasErrors, validateAccount } from '@/shared/utils/validation'

const STORAGE_KEY = 'accounts-manager:accounts:v1'

function uid(): string {
    return crypto.randomUUID();
}

function normalizeAccount(account: AccountRecord): AccountRecord {
    if (account.type === 'LDAP') return {...account, password: null}
    return {...account, password: account.password ?? ''}
}

export const useAccountsStore = defineStore('accounts', {
    state: (): AccountsState => ({
        accounts: [] as AccountRecord[],
        errorsById: {},
    }),

    getters: {
        getErrors: (s) => (id: string) => s.errorsById[id] ?? {},
    },

    actions: {
        initFromStorage(): void {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return

            try {
                const parsed = JSON.parse(raw) as { accounts: AccountRecord[] };
                this.accounts = Array.isArray(parsed.accounts) ? parsed.accounts.map(acc => normalizeAccount(acc)) : []
            } catch (error) {
                this.accounts = []
                this.errorsById = {}
            }
        },

        persist():void {
            const payload = {accounts: this.accounts};
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
        },

        addAccount():void {
            const id = uid();
            const next: AccountRecord = {
                id,
                labels: [],
                type: "LOCAL",
                login: "",
                password: "",
            }
            this.accounts.push(next);
            this.errorsById[id] = {}
            this.persist();
        },

        removeAccount(id: string):void {
            this.accounts = this.accounts.filter(acc => acc.id !== id)
            delete this.errorsById[id];
            this.persist();
        },

        commitAccount(params: {
            id: string;
            labelsRaw: string;
            type: AccountType;
            login: string;
            passwordInput: string;
            field: Field;
        }): {errors: AccountFieldErrors; isValid: boolean} {
            const idx = this.accounts.findIndex(acc => acc.id === params.id)

            if (idx === -1) return {errors: {login: 'Запись не найдена'}, isValid: false}
            
            const currentAccount = this.accounts[idx]

            const draft: AccountRecord = normalizeAccount({
                ...currentAccount,
                id: params.id,
                type: params.type,
                login: params.login,
                labels: parseLabels(params.labelsRaw),
                password: params.type === 'LDAP' ? null : params.passwordInput,
            })

            const allErrors = validateAccount({
                labelsRaw: params.labelsRaw,
                recordDraft: draft
            })

            const isValid = !hasErrors(allErrors)

            const errors = this.errorsById[params.id] ?? (this.errorsById[params.id] = {})

            if (params.field === 'labels') errors.labels = allErrors.labels
            if (params.field === 'login') errors.login = allErrors.login
            if (params.field === 'password') errors.password = allErrors.password
            if (params.field === 'type') errors.password = allErrors.password

            if (isValid) {
                this.accounts[idx] = draft
                this.persist()
            }

            return { errors, isValid }
        },
    },
})