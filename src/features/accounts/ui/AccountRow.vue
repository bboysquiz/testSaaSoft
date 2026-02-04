<template>
    <div class="account-row">
        <div class="account-row__cell">
            <el-input
                class="account-row__control"
                placeholder="Метка1; Метка2;..."
                maxlength="50"
                size="large"
            />
        </div>

        <div class="account-row__cell">
            <el-select
                class="account-row__control"
                placeholder="Выберите тип"
                size="large"
            >
                <el-option label="Локальная" value="LOCAL"/>
                <el-option label="LDAP" value="LDAP"/>
            </el-select>
        </div>

        <div class="account-row__cell">
            <el-input 
                class="account-row__control"
                placeholder="Логин"
                maxlength="100"
                size="large"
            />
        </div>

        <div class="account-row__cell">
            <div class="account-row__password">
                <el-input 
                    class="account-row__control"
                    type="password"
                    show-password
                    placeholder="Пароль"
                    maxlength="100"
                    size="large"
                />
            </div>
        </div>

        <div class="account-row__actions">
            <button 
                type="button"
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
import { Delete } from '@element-plus/icons-vue';

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
        &-placeholder
            display: flex
            width: 100%
            height: 36px
            align-items: center
            justify-content: center
            border: 1px dashed #e2e8f0
            border-radius: 10px
            color: #94a3b8
</style>