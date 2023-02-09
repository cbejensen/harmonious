<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
</script>

<h1>admin</h1>

<form method="POST">
  <textarea
    class="resize"
    name="notation"
    id=""
    cols="30"
    rows="10"
    value={data.song.arrangements[0].tracks[0].notation}
  />
  <button>save</button>
</form>

<pre>{JSON.stringify(data, undefined, 2)}</pre>
