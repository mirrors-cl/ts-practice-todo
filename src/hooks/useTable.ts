import { ref } from "vue";
import type { BasicColumn } from "../components/BasicTable.vue";

interface UseTableProps {
  columns: BasicColumn[];
  api?: () => Promise<any>;
}
// 自定义表格hook
export function useTable(props: UseTableProps) {
  //
  const dataSource = ref<any[]>([]);

  const loading = ref(false);

  const reload = async () => {
    if (!props.api) return;

    loading.value = true;
    try {
      const res = await props.api();
      // 假设 api 返回的是我们之前封装的 Result 结构，或者是直接数组
      // 这里简单处理，兼容一下
      dataSource.value = Array.isArray(res) ? res : res.result || []; // 适配不同返回结构

    } finally {
      loading.value = false;
    }
  }
  const getTableProps = ref({
    columns: props.columns,
    dataSource: dataSource
  })
  return {
    reload,
    getTableProps,
    loading
  }


}