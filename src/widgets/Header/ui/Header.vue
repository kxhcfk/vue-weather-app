<script setup lang="ts">
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Button } from "@/shared/ui/Button";
</script>

<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <Button>
                    <SearchIcon/>
                </Button>
            </div>
        </div>
    </header>
</template>

<style>
.header {
    position: sticky;
    top: 0;
    backdrop-filter: blur(5px);
}

.header__wrapper {
    padding-block: var(--space-s);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>