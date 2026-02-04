<template>
    <div class="account-row">
        <div class="account-row__cell">
            <el-input
                v-model="draft.labelsRaw"
                class="account-row__control"
                :class="{'account-row__control_invalid': Boolean(errors.labels)}"
                placeholder="Метка1; Метка2;..."
                maxlength="50"
                @blur="commit('labels')"
                size="large"
            />
        </div>

        <div class="account-row__cell">
            <el-select
                v-model="draft.type"
                class="account-row__control"
                placeholder="Выберите тип"
                @change="onTypeChange"
                size="large"
            >
                <el-option label="Локальная" value="LOCAL"/>
                <el-option label="LDAP" value="LDAP"/>
            </el-select>
        </div>

        <div class="account-row__cell">
            <el-input 
                v-model="draft.login"
                class="account-row__control"
                :class="{'account-row__control_invalid': Boolean(errors.login)}"
                placeholder="Логин"
                maxlength="100"
                @blur="commit('login')"
                size="large"
            />
        </div>

        <div class="account-row__cell">
            <div v-if="draft.type === 'LOCAL'" class="account-row__password">
                <el-input 
                    v-model="draft.passwordInput"
                    class="account-row__control"
                    :class="{'account-row__control_invalid': Boolean(errors.password)}"
                    type="password"
                    show-password
                    placeholder="Пароль"
                    maxlength="100"
                    @blur="commit('password')"
                    size="large"
                />
            </div>

            <div v-else class="account-row__password account-row__password_hidden">
                <span class="account-row__password-placeholder">-</span>
            </div>
        </div>

        <div class="account-row__actions">
            <button 
                type="button"
                @click="$emit('remove', account.id)"
                aria-label="Удалить учетную запись"
                class="account-row__delete-btn">
                <el-icon class="account-row__delete-icon" aria-hidden="true">
                    <Delete />
                </el-icon>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { AccountRecord, AccountFieldErrors, AccountType, Field } from '@/shared/types/accounts';
import { labelsToString } from '@/shared/utils/labels';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps<{
    account: AccountRecord;
    errors: AccountFieldErrors;
}>();

const emit = defineEmits<{
    (e: 'remove', id: string): void;
    (e: 'commit', payload: {
        id: string;
        labelsRaw: string;
        type: AccountType;
        login: string;
        passwordInput: string;
        field: Field
    }): void;
}>();

const draft = reactive({
    labelsRaw: labelsToString(props.account.labels),
    type: props.account.type as AccountType,
    login: props.account.login,
    passwordInput: props.account.password ?? '',
})

watch(
    () => props.account,
    (next) => {
        draft.labelsRaw = labelsToString(next.labels);
        draft.type = next.type;
        draft.login = next.login;
        draft.passwordInput = next.password ?? '';
    },
    { deep: true }
);

function commit(field: Field) {
    emit('commit', {
        id: props.account.id,
        labelsRaw: draft.labelsRaw,
        type: draft.type,
        login: draft.login,
        passwordInput: draft.passwordInput,
        field,
    });
}

function onTypeChange() {
    commit('type');
}
</script>
<style scoped lang="sass">
.account-row
    display: flex
    gap: 8px
    align-items: stretch
    &__cell
        flex: 1 1 0
        display: flex
    &__actions
        flex: 0 0 44px
        display: flex
        align-items: center
        justify-content: center
    &__delete-btn
        width: 36px
        height: 36px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 10px
        border: 1px solid #f1f5f9
        background-color: #fff
        cursor: pointer
        &:hover
            transition: .3s
            background-color: #f8fafc
    &__control
        width: 100%
    &__password
        width: 100%
        display: flex
        &_hidden
            align-items: center
        &-placeholder
            display: flex
            width: 100%
            height: 36px
            align-items: center
            justify-content: center
            border: 1px dashed #e2e8f0
            border-radius: 10px
            color: #94a3b8
    &__control_invalid 
        :deep(:is(.el-input__wrapper, .el-select__wrapper))
            box-shadow: 0 0 0 1px #ef4444 inset !important
</style>