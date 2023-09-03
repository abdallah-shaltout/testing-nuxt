<template>
    <section class="py-14" dir="rtl">
        <div class="container">
            <div class="flex-between mb-6 w-1/2 gap-5 mr-auto">
                <button class="py-3 px-6 bg-blue-500 rounded text-light trans hover:bg-blue-600 hover:text-white">بحث</button>
                <input type="text" class="text-dark text-lg placeholder:text-dark-50 bg-slate-200 py-3 px-4 rounded flex-1" placeholder="بحث ..." v-model="search_box" />
            </div>
            <h1 class="text-5xl text-center text-dark abs-center" v-if="pending">جاري التحميل ...</h1>
            <div class="grid grid-cols-3 gap-4" v-if="!pending">
                <div v-for="(item, idx) in items?.body" class="rounded-lg shadow-lg">
                    <div class="w-full aspect-square overflow-hidden bg-slate-200">
                        <img :src="item?.image" alt="" class="h-full mx-auto object-cover mix-blend-multiply contrast-150 rounded-lg t-trans hover:scale-110" />
                    </div>
                    <div class="p-4">
                        <a :href="item.url" class="text-dark-50 trans hover:text-dark">
                            <h3 class="text-lg font-bold">{{ text_slice(item.title, 80) }}</h3>
                        </a>
                        <h4 class="text-lg font-bold">{{ item.price }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { text_slice } from "~/libs/text";
    const search_box = ref<string>("بخاخ");
    const { data: items, refresh, pending } = await useAsyncData("items", () => $fetch(`/api/item?search=${search_box.value}`));

    watch(
        () => search_box.value,
        (val: string) => {
            refresh({ dedupe: true });
        }
    );

    const price = (num: number) => {
        let p = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EGP",
        });
        let res = p.format(num || 0);
        res = res.replace("EGP ", "");
        return res;
    };
</script>
