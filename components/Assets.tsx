import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export function ApiIcon() {
  return (
    <svg
      class={`icon-svg h-6 w-7`}
      fill={colorScheme[currentColorScheme].white}
      viewBox="0 0 576 448"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M208,0h-48c-53,0-96,43-96,96v37.5c0,8.5-3.4,16.6-9.4,22.6L9.4,201.4c-12.5,12.5-12.5,32.8,0,45.3c0,0,0,0,0,0l45.2,45.2
      c6,6,9.4,14.1,9.4,22.6V352c0,53,43,96,96,96h48c8.8,0,16-7.2,16-16v-32c0-8.8-7.2-16-16-16h-48c-17.7,0-32-14.3-32-32v-37.5
      c0-25.5-10.1-49.9-28.1-67.9L77.3,224l22.6-22.6c18-18,28.1-42.4,28.1-67.9V96c0-17.7,14.3-32,32-32h48c8.8,0,16-7.2,16-16V16
      C224,7.2,216.8,0,208,0z M566.6,201.4l-45.2-45.2c-6-6-9.4-14.2-9.4-22.6V96c0-53-43-96-96-96h-48c-8.8,0-16,7.2-16,16v32
      c0,8.8,7.2,16,16,16h48c17.7,0,32,14.3,32,32v37.5c0,25.5,10.1,49.9,28.1,67.9l22.6,22.6l-22.6,22.6c-18,18-28.1,42.4-28.1,67.9V352
      c0,17.7-14.3,32-32,32h-48c-8.8,0-16,7.2-16,16v32c0,8.8,7.2,16,16,16h48c53,0,96-43,96-96v-37.5c0-8.5,3.4-16.6,9.4-22.6l45.2-45.2
      C579.1,234.1,579.1,213.9,566.6,201.4C566.6,201.4,566.6,201.4,566.6,201.4L566.6,201.4z"
      />
    </svg>
  );
}

export function ButtonLines() {
  return (
    <svg
      width="1.7rem"
      height="1.7rem"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g stroke-width="0"></g>
      <g stroke-linecap="round" stroke-linejoin="round"></g>
      <g>
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          fill="currentColor"
          d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
        >
        </path>
      </g>
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg
      class={`icon-svg h-6 w-6`}
      fill={colorScheme[currentColorScheme].white}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );
}

export function HistoIcon() {
  return (
    <svg
      id="HistoIcon"
      class={`icon-svg h-9 w-9`}
      fill={colorScheme[currentColorScheme].white}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80.8 48"
    >
      <path d="M54.1,19c-0.1-0.2-0.1-0.3-0.2-0.4l8.9-5.6c-0.4-0.6-0.8-1.2-1.3-1.8l-9.1,5.7c-0.3-0.6-0.7-1.2-1.4-1.5
		c-0.1-0.1-0.2-0.1-0.3-0.1c-0.7-0.3-1.4-0.4-2.1-0.3c-0.7-0.4-1.5-0.6-2.3-0.4c-0.7,0.1-1.4,0.5-1.8,1c-0.7,0.1-1.3,0.4-1.8,1
		c-0.6,0.6-0.9,1.4-1,2.1c-0.6,0.6-0.9,1.3-1,2.1c-0.1,0.8,0.2,1.6,0.6,2.3c-0.1,0.8,0.1,1.6,0.6,2.3s1.2,1.1,2,1.3
		c0.5,0.6,1.1,1.1,2,1.3c0.8,0.2,1.6,0.1,2.3-0.3c0.8,0.2,1.6,0.1,2.3-0.3c0.8-0.4,1.3-1,1.6-1.7c0.7-0.4,1.3-1,1.6-1.7
		c0.3-0.8,0.3-1.6,0.1-2.4c0.1-0.1,0.1-0.3,0.1-0.4C54.4,20.4,54.4,19.7,54.1,19z M51.7,22.6c-0.5,1.4-1.7,2.4-3.3,2.7
		c-2.3,0.4-4.5-1.2-4.9-3.5c-0.4-2.3,1.2-4.5,3.5-4.9c0.4-0.1,0.8-0.1,1.2,0c0.9,0.1,1.8,0.5,2.5,1.2c0.5,0.5,0.9,1.1,1.1,1.9
		c0,0.1,0.1,0.3,0.1,0.4C52,21.2,51.9,21.9,51.7,22.6z" />
      <path d="M75.1,41.1c-2-1.7-3.7-3.7-5.1-6.1c-1.6-3-2.7-6.5-3.1-10.4c-0.4-3.6-1.4-6.8-3-9.7l-7.8,4.9c0,0.4,0,0.8-0.1,1.2
		c0,0.2-0.1,0.3-0.2,0.5c0.3,1,0.3,2-0.1,3c-0.4,1-1.1,1.8-2,2.2c-0.4,0.9-1.1,1.7-2,2.2c-1,0.5-2,0.6-3,0.4c-0.9,0.5-1.9,0.6-3,0.4
		c-1.1-0.2-1.9-0.9-2.5-1.7c-1-0.2-1.9-0.8-2.5-1.7s-0.9-1.9-0.8-2.9c-0.6-0.8-0.9-1.8-0.8-2.9c0.1-1.1,0.5-2,1.3-2.7
		c0.1-1,0.5-2,1.3-2.7c0.7-0.7,1.5-1.1,2.3-1.2c0.6-0.6,1.4-1.1,2.3-1.2c1.1-0.2,2.1,0,3,0.6c0.9-0.1,1.8,0,2.6,0.4
		c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.1,0.4,0.2,0.5,0.4l7.4-4.6C54.3,3.3,46.2,0.2,40.2,0c-9.8,0.3-25,8.3-26.7,24.6
		c-0.4,4-1.5,7.5-3.1,10.4c-1.3,2.4-3,4.5-5.1,6.1L0,44.7c8,6,15.9,2.2,19.7,0.4c4.1-1.9,11.8-9.7,15.2-11.2
		c1.8-0.8,3.5-1.2,5.3-1.3c1.8,0.1,3.5,0.5,5.3,1.3c3.5,1.4,11.1,9.3,15.2,11.2c3.9,1.7,12,5.7,20-0.7
		C79.6,43.9,76.6,42.3,75.1,41.1z" />
    </svg>
  );
}

export function InterrogationIcon() {
  return (
    <svg
      id="InterrogationIcon"
      class={`icon-svg h-7 w-6`}
      fill={colorScheme[currentColorScheme].white}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 87.3 138.4"
    >
      <path d="M85.2,1.3c-1-1-3-1.8-10.7-0.9C63.3,1.7,45.4,6.2,32.4,10c-10,2.9-27.1,8.2-28.7,10.9
		c-1.8,2.9-2.9,16.8-3.3,24.5c-0.5,9.8-0.7,21.8,1.5,24c2.1,2.1,7.1,1.6,10.9,0.8c1.1-0.2,10.6-2.2,12-5.6c0.8-2-0.5-5.2-3-10.7
		c-1.5-3.3-4-8.8-3.3-10c0.7-1,6.7-4.4,18.1-8.7c11-4.2,17.7-5.7,19.2-5.5c0.6,1,1.2,5.4,0.7,12.5S54.6,54,53.7,55
		c-0.7,0.7-2.5,2.5-4.8,4.8C33.9,74.8,24.5,84.6,23.5,87c-1.4,3.5-2.4,18.2,0.7,21.7c0.4,0.4,1.2,1.4,4.9,1.4c2.9-0.1,5.8-0.4,8.7-1
		c5-1,11.3-2.7,13-4.3c1.9-1.7,1.8-5.6,1.3-11.8c-0.2-2.9-0.5-6.3-0.1-7.7c0.5-1.7,8.5-8.1,13.8-12.3c6.3-5,11.8-9.4,13.3-11.7
		c1.8-2.9,4.7-17.5,6.4-29.4C88,14.3,87.9,4,85.2,1.3z" />
      <path d="M50.7,115.3c-2.2-1.6-10.6-0.2-15.4,0.8c-3,0.6-12.9,2.8-15.1,5.3c-2.5,2.9-7.5,11.9-3.8,15.4
		c1.2,1.1,3.9,1.5,7.2,1.5c6.2,0,14.1-1.4,16.1-2.2c3.5-1.4,11.4-13.3,12-17.9C51.9,117.1,51.6,116,50.7,115.3z" />
    </svg>
  );
}

export function PaintPalette() {
  return (
    <svg
      id="PaintPalette"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 474 349.3"
    >
      <g>
        <path
          d="M465.4,131.1c26.8,71.7-15.8,123.7-59.2,161.3c-57.9,50.1-179,68-267.9,49.4C77.7,329.2,3.9,305,0.4,245
          c-2.1-36.4,20.8-48.6,65.3-49.5c23.3-0.5,28.5-25.4,11-37.5C42.9,134.5-68.2,13.1,201.6,0.6c6-0.3,12.1-0.4,18.3-0.4
          C312.3,0.6,418.5,36,465.4,131.1z M145.2,99.2c0.1-14.5-14.7-26.3-33.2-26.4h-0.3c-18.4,0-33.4,11.7-33.4,26.2
          c0,14.5,14.9,26.3,33.3,26.4C130.1,125.4,145.1,113.7,145.2,99.2z"
          style="fill: #e5c76b"
        />
      </g>
    </svg>
  );
}

export function StatIcon() {
  return (
    <svg
      class={`icon-svg h-6 w-6`}
      fill={colorScheme[currentColorScheme].white}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"
      />
    </svg>
  );
}

export function UrartsTrimBrush() {
  return (
    <svg
      class={`h-6 w-6`}
      viewBox="0 0 82.1 119.6"
    >
      <g>
        <path
          class="st0"
          d="M12.5,99.7c-22.3-37.5,27.6-59.9,38-92.9C81,41.4,84.4,82.5,54.7,107.2C46.4,114.1,23.1,117.6,12.5,99.7z"
          style="fill: #dadada"
        />
      </g>
      <g>
        <path
          class="st1"
          d="M18.5,60.1c13,25.1,43.7,21.5,50.5-14.4c10.1,40.9-18,68.9-40.1,61.9C6.8,100.7,8.6,74,18.5,60.1z"
          style="fill: #b3b9b8"
        />
      </g>
      <g>
        <path
          class="st2"
          d="M32.1,119.4c-0.8-0.1-1.5-0.2-2.3-0.3c-10-1.7-18-7.2-23.2-15.9l0,0C-0.9,90.5-2,78,3.2,65
            c4.4-10.7,12.6-20.4,20.5-29.7C32,25.5,40.6,15.4,44,4.8c0.8-2.3,2.7-4.1,5.1-4.6c2.4-0.5,4.9,0.3,6.5,2.2
            c18.6,21.2,28,44.9,26.2,66.9c-1.3,17-9.2,32-22.9,43.3C52.7,117.7,41.9,120.5,32.1,119.4z M18.4,96.2c3.1,5.2,7.7,8.3,13.7,9.4
            c7.1,1.2,14.8-0.9,18.2-3.7C61,93,67.3,81.3,68.3,68.1c1.2-15.4-4.4-32.3-16-48.2c-4.8,8.7-11.5,16.6-18.1,24.3
            C17.1,64.2,7.3,77.4,18.4,96.2L18.4,96.2z"
          style="fill: #141b1e"
        />
      </g>
    </svg>
  );
}

export function WomanIcon() {
  return (
    <svg
      id="WomanIcon"
      class={`icon-svg h-9 w-9`}
      fill={colorScheme[currentColorScheme].white}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 491.1 342.7"
    >
      <path
        id="path14"
        d="M385.5,213.9c-15.5-37.8-36.8-30.3-36.8-30.3S345.5,205.9,385.5,213.9"
        style="fill: #c47fd5"
      />
      <path
        id="path16"
        d="M307.7,212.6c16.7-37.2,37.8-29.1,37.8-29.1S348,206,307.7,212.6"
        style="fill: #c47fd5"
      />
      <path
        id="path18"
        d="M295.1,137.9c57.7,6.5,50.4,40.8,50.4,40.8S313.4,193,295.1,137.9"
        style="fill: #c47fd5"
      />
      <path
        id="path20"
        d="M482.7,273.2l-77.1-83.4c-10,1.2-20.1,1.7-30.5,1.5c4.8,5.3,9.1,12.5,12.8,21.5l1.9,4.5l-4.8-1
	c-5.5-1.1-10.6-2.5-15-4.3l0,0c-15.6-6.1-21.1-14.9-23-21.2c-2.7,7.9-11.3,19.7-38.9,24.2l-4.8,0.8l2-4.5
	c6.1-13.5,12.7-21.3,18.9-25.8c-0.4-0.1-0.8-0.2-1.2-0.2c-18.5-3.9-37.6-9.6-56.8-17.2c-14.1-5.6-28.4-12.1-42.8-19.6
	c-31.1-16.2-56.6-33.7-73.7-46.7L3.2,144.7c-5,1.4-3.9,8.7,1.2,8.8c9.5,0.1,19,0.8,28.4,2.6c44.2,8.5,79.6,40.2,113.7,69.6
	c51,44,105.8,86.5,170.2,106.5C368,347.9,427,347,473.9,322.8C492.5,313.2,496.9,288.6,482.7,273.2L482.7,273.2z M159.2,89.4
	c15.7,11.8,40.8,29.2,71.6,45.3c13.8,7.2,27.7,13.6,41.2,18.9c11.2,4.4,22.4,8.2,33.3,11.3c-4.9-6.8-9.2-15.6-12.7-26.2l-1.3-3.9
	l4.1,0.5c9.9,1.1,18.6,3.1,25.9,6c18.2,7.2,24.4,18.5,26.3,26.9c1-3.5,2.8-7.4,6-11.3c9-11,25.2-17.1,48.2-18.3l4.1-0.2l-1.5,3.8
	c-6.9,17.1-14.8,27.4-22.5,33.5c7.5-0.1,14.8-0.6,22-1.4l6.8-0.8c20-66.4-13.9-138.2-79.6-164c-69.2-27.2-147.4,6.8-174.6,76
	c-0.2,0.5-0.4,1-0.6,1.5L159.2,89.4"
      />
      <path
        id="path22"
        d="M401.8,141.2c-58,2.9-52.8,37.6-52.8,37.6S380.2,195,401.8,141.2"
        style="fill: #c47fd5"
      />
    </svg>
  );
}

export function WomanLogo() {
  return (
    <svg
      id="WomanLogo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 709.1 709.1"
    >
      <g id="g10" transform="matrix(1.3333333,0,0,-1.3333333,0,1066.6667)">
        <g id="g12" transform="scale(0.1)">
          <path
            id="path14"
            style="fill: #c47fd5"
            d="M3821.3,5850.5c-116.1,283.3-276,227.5-276,227.5S3521.1,5910.5,3821.3,5850.5"
          />
          <path
            id="path16"
            style="fill: #c47fd5"
            d="M3237.7,5860.1c125.4,279.3,283.3,218.3,283.3,218.3S3539.8,5910,3237.7,5860.1"
          />
          <path
            id="path18"
            style="fill: #c47fd5"
            d="M3143.1,6420.7c432.8-48.4,378-305.9,378-305.9S3280.7,6007.5,3143.1,6420.7"
          />
          <path
            id="path20"
            style="fill: #232a2d"
            d="M4550.1,5405.6l-578,625.3c-74.7-8.8-150.9-12.6-228.5-11.6c36.2-39.9,68.3-93.7,96-161.3
			l13.9-34l-36,7.2c-41.4,8.3-79.1,19.1-112.2,32.1l0,0c-116.9,46-158.5,111.9-172.9,159.1c-20-59.5-85-147.7-291.4-181.8l-36.2-6
			l15,33.5c45.5,101.2,95.5,160.1,141.7,193.7c-3,0.6-5.9,1.2-8.9,1.8c-139.1,29.1-281.6,72.4-426.3,129.3
			c-106,41.7-213,90.8-320.7,147c-233,121.6-424.3,253-553.1,350.1L954.1,6369.7c-37.1-10.8-29.5-65.5,9.2-65.8
			c71.5-0.4,142.8-5.7,213.1-19.2c331.2-63.9,597.1-301.3,852.5-521.7c382.8-330.3,793.6-649.1,1276.6-798.6
			c384.8-119.2,826.9-111.8,1178.7,69.4C4623.6,5105.6,4656.6,5290.4,4550.1,5405.6L4550.1,5405.6z M2123.6,6784.4
			c117.4-88.5,305.8-219.2,536.7-339.7c103.4-54,207.5-101.7,309.3-141.8c84.1-33.1,167.7-61.4,250.1-84.8
			c-36.9,51.3-68.7,116.8-95.2,196.3l-9.7,29.2l30.6-3.4c74.4-8.3,139.7-23.4,194-44.8c136.4-53.7,182.6-138.4,197.2-201.5
			c7.7,26.1,21.2,55.6,45,84.7c67.5,82.4,189,128.5,361.2,137.2l30.8,1.5l-11.5-28.6c-51.7-128.5-111.2-205.8-168.8-251.2
			c55.9,0.8,111,4.3,165.1,10.7l51.4,6c150.1,498-104.6,1036.1-597.2,1230.1c-519,204.4-1105.4-50.6-1309.8-569.6
			c-1.5-3.8-2.9-7.5-4.3-11.3L2123.6,6784.4"
          />
          <path
            id="path22"
            style="fill: #c47fd5"
            d="M3943.7,6396.1c-434.9-21.8-396.1-282.2-396.1-282.2S3781.1,5992.2,3943.7,6396.1"
          />
          <path
            id="path24"
            style="fill: #232a2d"
            d="M1493.6,3774.3c-12.8-18.7-26.1-38.6-38.5-59.9c-6.5-10.5-12.1-21.7-18.2-32.8
			c-5.5-11.4-11.4-22.8-16.8-34.5c-5.2-11.8-10.7-23.6-15.1-35.8c-5-12.1-9-24.5-13-36.9c-4.4-12.3-7.3-25.1-11-37.5
			c-2.8-12.7-5.8-25.3-8.1-37.9c-4.1-25.3-7.8-50.4-8.6-74.9c-0.4-12.2-1.1-24.3-0.6-36.1c0.4-11.8-0.1-23.4,1.3-34.6
			c1.1-11.2,1.6-22.2,3.1-32.8s3-20.8,4.4-30.6c1.6-9.8,4-19,5.7-27.9c1.8-8.9,3.4-17.4,5.7-25.1c2.1-7.8,4.1-15.2,5.9-21.9
			c1.7-6.8,3.4-13.1,5.4-18.6c7.3-22.2,11.2-35.1,11.2-35.1s-6.2,11.8-16.7,33c-5.6,10.5-10.4,24-16.6,39.2
			c-3.3,7.6-5.9,16-8.7,24.8c-2.8,8.8-5.9,18.1-8.5,28c-2.4,9.9-4.8,20.3-7.3,31c-2.5,10.8-3.6,22.1-5.5,33.7
			c-2.1,11.6-2.5,23.7-3.7,35.9c-1.4,12.3-0.9,25-1,37.8c0.1,25.7,2.2,52.3,6.5,79c2.2,13.3,5.2,26.6,8,40
			c3.7,13.1,6.6,26.6,11.1,39.6c4.4,13,8.8,26,14.1,38.6c4.9,12.8,10.7,25.1,16.3,37.3c11.5,24.3,24.9,47.3,38.7,68.7
			c13.4,21.8,28.7,41.2,43,59.6c14.8,18.1,29.3,34.6,43.6,49.1c14,14.7,27.7,27.3,40.1,38.1c12.3,10.9,23.6,19.8,32.9,27
			c18.8,14.3,30.3,21.2,30.3,21.2s-2.5-2.3-7.1-6.5c-4.6-4.3-11.1-10.8-19.4-19.1c-16.4-16.7-39.2-41-64.2-71.9
			C1519.6,3810,1507,3792.6,1493.6,3774.3L1493.6,3774.3z M1494.8,4004.7c5,10.6,13.3,25.7,21.9,45.8c4.4,9.9,9.3,20.9,14.6,32.9
			c4.8,12.2,9.9,25.5,15.4,39.6c10.4,28.5,21.1,60.9,31.5,96.7c5.3,17.8,9.5,36.8,14.6,56.2c4.2,19.6,9,39.8,12.9,60.7
			c3.7,21,7.9,42.4,10.7,64.7c1.5,11.1,3.3,22.2,4.6,33.6c1.3,11.3,2.6,22.8,3.9,34.3c4.8,46.2,7.8,94.2,9,143
			c1,24.4,0.6,49,0.9,73.7c-0.6,24.7-0.7,49.5-2.1,74.3c-1.7,49.5-4.9,99.6-7,148.8c-2.4,49.2-3.4,97.9-2.9,145
			c0,23.6,1,46.8,2,69.5c0.6,11.4,1.7,22.6,2.5,33.6s1.6,22,3.1,32.8c1.3,10.8,2.5,21.4,3.7,31.8c1.5,10.4,3.3,20.7,5,30.7
			c3,20.2,7.9,39.3,11.9,57.8c1.9,9.3,4.7,18.1,7.2,26.9c2.5,8.7,5,17.2,7.4,25.5c5.6,16.3,11.6,31.6,16.8,46
			c6.1,14.1,12.2,27.1,17.6,39.2s12,22.5,17,32.2c9.9,19.6,20.8,33.2,27,43.1c6.6,9.7,10.1,14.9,10.1,14.9s-3-5.5-8.7-15.7
			c-5.5-10.4-14.6-24.9-23.3-44.9c-4.4-10-10.2-20.5-14.7-32.9c-4.5-12.3-9.7-25.5-14.8-39.7c-4.2-14.5-9.1-29.8-13.5-46.1
			c-3.5-16.6-8.5-33.7-11.7-51.9c-3.1-18.3-7-37.2-9-57.1c-1.1-9.9-2.6-20-3.7-30.3c-0.8-10.3-1.7-20.8-2.6-31.4
			c-3.1-42.4-4.1-87.3-3.5-133.9c0.2-46.5,2.9-94.6,5.3-143.7s6-98.7,8-149c1.2-25.1,1.1-50.3,1.6-75.3c-0.4-25.1-0.2-50-1.4-74.8
			c-1.4-49.5-6.1-98.2-11.7-145c-3.1-23.4-6.1-46.4-10.4-68.8c-3.6-22.4-8.6-44.1-13.1-65.3c-4.8-21.1-10.2-41.5-15.4-61.1
			c-6.1-19.5-11.3-38.4-17.5-56.2c-11.9-35.8-25-67.9-37.5-95.8c-6.5-13.9-12.5-26.8-18.1-38.8c-6.2-11.7-11.9-22.5-17-32.2
			c-2.6-4.9-5-9.4-7.3-13.8c-2.5-4.2-4.9-8.1-7.1-11.7c-4.4-7.3-8.2-13.4-11.2-18.4c-6.1-10-9.4-15.3-9.4-15.3
			S1489.6,3994.2,1494.8,4004.7L1494.8,4004.7z M2662.9,8000C1203.6,8002,8.9,6816.5,0.1,5357.3
			c-5.4-886.4,423.1-1672.9,1085.3-2160c-50.2,103.7-58.4,200.7-58.8,249.5c0,5.8,0.2,11.5,0.4,17.3c1.8,39.2,7.8,78.3,16.6,116.7
			C570.2,4015.7,272.6,4639,270.1,5332c-4.7,1317.9,1069.3,2396.9,2387.2,2397.9c1320.4,1.1,2391.2-1069,2391.2-2389.2
			c0-1320-1059.9-2384.1-2379.9-2389.1c-299.9-1.2-587,53-851.7,152.9c-254.1,95.8-334.1,417.1-152.4,618.8c1.4,1.6,2.9,3.2,4.4,4.8
			c149.9,164.9,328.6,299.1,502.8,437.6c35.6,28.6,296.8,244.5,425.1,518.1c-147.4-60.9-442.2-110-442.2-110
			c-210.4-47.2-161.2,167.5-161.2,167.5c41.4,116.2-67.9,158.7-67.9,158.7c-106.3,24.8-19.6,118.2-19.6,118.2
			c-98.4,50.4-66.7,104.3-66.7,104.3c101.3,83.7-75.7,127.1-75.7,127.1c-80.6,47.3,28.6,156.6,28.6,156.6
			c90.5,75.8,116.1,177.2,116.1,177.2c-57.4,5.5-102.1,50.4-127.8,83.5c20.8-9.9,42.8-15.8,63.3-18.8c43.4-7.8,84.2-0.7,84.2-0.7
			l-2.5,15.1c-6.4,38.5-19.7,97-33.3,140.2c-51.3,43.9-103.2,87.3-156.1,128.9c-0.5,0.4-61.8-148.2-64.5-156.6
			c-50.5-154.6-76.5-317.1-88.5-478.9c-19.2-258.9,20.8-517.9-11.1-776.1c-10.5-96.5-32.2-183.1-53.7-258.5
			c-22.8-75.2-48.1-138.8-71.5-189.7c-12.1-25.3-22.9-47.8-32.2-67.5c-60.1-107.3-129.6-205.9-170.8-322.8
			c-24.4-69.3-42.3-142.5-45.6-216.1c-0.3-5.8-0.4-11.5-0.4-17.3c0.1-16.7,1.2-39.2,4.6-65.6c0.6-4.6,1.2-9.2,1.9-13.8
			c0.1-0.4,0.1-0.8,0.2-1.2c55.4-348,489.1-511.1,524.5-523.9c0.8-0.3,1.5-0.6,2.3-0.8h0.1l0,0c111-39.6,268-86.6,459.8-120.2
			c0,0-0.2,0.1-0.3,0.2c152.1-27.1,308.6-41.4,468.5-41.4c1468.7,0,2659.2,1190.6,2659.2,2659.2
			C5318.5,6808.2,4129.9,7998.1,2662.9,8000"
          />
        </g>
      </g>
    </svg>
  );
}
