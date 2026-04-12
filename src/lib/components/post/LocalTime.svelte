<script lang="ts">
  let { dt }: { dt: Date } = $props();
</script>

<time datetime={dt.toISOString()}>
  {dt.toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" })}
</time>
