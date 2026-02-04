<template>
    <section class="accounts">
        <header class="accounts__header">
            <h1 class="accounts__title">Учетные записи</h1>

            <button 
                type="button"
                class="accounts__add-btn"
                @click="onAdd"
                aria-label="Добавить учетную запись"
            >
                +
            </button>
        </header>
        <div class="accounts__hint">
            <span class="accounts__hint-icon" aria-hidden="true">?</span>
            <p class="accounts__hint-text">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель <span class="accounts__separator">;</span>
            </p>
        </div>

        <ul class="accounts__list">
            <li class="accounts__labels-header">
                <div class="accounts__label-data">Метки</div>
                <div class="accounts__label-data">Тип записи</div>
                <div class="accounts__label-data">Логин</div>
                <div class="accounts__label-data">Пароль</div>
                <div class="accounts__label-data accounts__label-actions"></div>
            </li>
            <AccountRow 
                v-for="acc in store.accounts"
                :key="acc.id"
                class="accounts__row"
                :account="acc"
                :errors="store.getErrors(acc.id)"
                @remove="store.removeAccount"
                @commit="store.commitAccount"
            />

            <div v-if="!store.accounts.length" class="accounts__empty">
                Нет учетных записей - нажмите "+", чтобы добавить
            </div>
        </ul>
    </section>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import AccountRow from './AccountRow.vue';
import { useAccountsStore } from '@/stores/accounts.store';

const store = useAccountsStore()

function onAdd() {
    store.addAccount();
}

onMounted(() => {
    store.initFromStorage();
})

</script>
<style scoped lang="sass">
.accounts 
    display: flex
    flex-direction: column
    gap: 12px
    padding: 16px
    &__header
        display: flex
        align-items: center
        justify-content: space-between
        gap: 12px
    &__title
        margin: 0
        font-size: 20px
        font-weight: 700
    &__add-btn
        width: 32px
        height: 32px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 8px
        border: 1px solid #d0d5dd
        background-color: #fff
        cursor: pointer
        font-size: 18px
        line-height: 1
        &:hover
            transition: .3s
            background-color: #f7f7f7
    &__hint
        display: flex
        align-items: center
        gap: 16px
        padding: 10px 12px
        border-radius: 10px
        border: 1px solid #e6e8ec
        background: #fafafa
        &-icon
            width: 20px
            height: 20px
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            border: 1px solid #cbd5e1
            font-weight: 700
            font-size: 12px
        &-text
            margin: 0
            font-size: 13px
    &__list
        display: flex
        flex-direction: column
        gap: 8px
        padding-left: 0
    &__labels-header
        display: flex
        gap: 8px
    &__label
        &-data
            flex: 1 1 0
            font-size: 12px
            color: #667085
        &-actions
            flex: 0 0 44px;
    &__row
        display: flex
    &__empty
        padding: 12px
        border: 1px dashed #d0d5dd
        border-radius: 10px
        color: #667085
        font-size: 13px
    &__separator
        font-weight: 700
</style>