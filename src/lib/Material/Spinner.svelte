<script lang="ts" context="module">
  import { MDCCircularProgress } from "@material/circular-progress";

  function material(node: HTMLElement, progress: number | undefined) {
    const spinner = new MDCCircularProgress(node);
    if ((spinner.determinate = progress != undefined)) {
      spinner.progress = progress;
    }
    return {
      update(progress: number | undefined) {
        if ((spinner.determinate = progress != undefined)) {
          spinner.progress = progress;
        }
      },
    };
  }
</script>

<script lang="ts">
  export let progress: number | undefined = undefined;
</script>

<div
  class="mdc-circular-progress"
  style="width:24px;height:24px;"
  role="progressbar"
  use:material={progress}
>
  <div class="mdc-circular-progress__determinate-container">
    <svg
      class="mdc-circular-progress__determinate-circle-graphic"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="mdc-circular-progress__determinate-track"
        cx="12"
        cy="12"
        r="8.75"
        stroke-width="2.5"
      />
      <circle
        class="mdc-circular-progress__determinate-circle"
        cx="12"
        cy="12"
        r="8.75"
        stroke-dasharray="54.978"
        stroke-dashoffset="54.978"
        stroke-width="2.5"
      />
    </svg>
  </div>
  <div class="mdc-circular-progress__indeterminate-container">
    <div class="mdc-circular-progress__spinner-layer">
      <div
        class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="8.75"
            stroke-dasharray="54.978"
            stroke-dashoffset="27.489"
            stroke-width="2.5"
          />
        </svg>
      </div>
      <div class="mdc-circular-progress__gap-patch">
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="8.75"
            stroke-dasharray="54.978"
            stroke-dashoffset="27.489"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="8.75"
            stroke-dasharray="54.978"
            stroke-dashoffset="27.489"
            stroke-width="2.5"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
