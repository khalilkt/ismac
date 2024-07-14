export function ErrorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10.3333C7.18889 10.3333 7.34722 10.2694 7.475 10.1417C7.60278 10.0139 7.66667 9.85556 7.66667 9.66667C7.66667 9.47778 7.60278 9.31945 7.475 9.19167C7.34722 9.06389 7.18889 9 7 9C6.81111 9 6.65278 9.06389 6.525 9.19167C6.39722 9.31945 6.33333 9.47778 6.33333 9.66667C6.33333 9.85556 6.39722 10.0139 6.525 10.1417C6.65278 10.2694 6.81111 10.3333 7 10.3333ZM7 7.66667C7.18889 7.66667 7.34722 7.60278 7.475 7.475C7.60278 7.34722 7.66667 7.18889 7.66667 7V4.33333C7.66667 4.14444 7.60278 3.98611 7.475 3.85833C7.34722 3.73056 7.18889 3.66667 7 3.66667C6.81111 3.66667 6.65278 3.73056 6.525 3.85833C6.39722 3.98611 6.33333 4.14444 6.33333 4.33333V7C6.33333 7.18889 6.39722 7.34722 6.525 7.475C6.65278 7.60278 6.81111 7.66667 7 7.66667ZM4.76667 12.3333H3C2.63333 12.3333 2.31944 12.2028 2.05833 11.9417C1.79722 11.6806 1.66667 11.3667 1.66667 11V9.23333L0.383333 7.93333C0.261111 7.8 0.166667 7.65278 0.1 7.49167C0.0333333 7.33056 0 7.16667 0 7C0 6.83333 0.0333333 6.66944 0.1 6.50833C0.166667 6.34722 0.261111 6.2 0.383333 6.06667L1.66667 4.76667V3C1.66667 2.63333 1.79722 2.31944 2.05833 2.05833C2.31944 1.79722 2.63333 1.66667 3 1.66667H4.76667L6.06667 0.383333C6.2 0.261111 6.34722 0.166667 6.50833 0.1C6.66944 0.0333333 6.83333 0 7 0C7.16667 0 7.33056 0.0333333 7.49167 0.1C7.65278 0.166667 7.8 0.261111 7.93333 0.383333L9.23333 1.66667H11C11.3667 1.66667 11.6806 1.79722 11.9417 2.05833C12.2028 2.31944 12.3333 2.63333 12.3333 3V4.76667L13.6167 6.06667C13.7389 6.2 13.8333 6.34722 13.9 6.50833C13.9667 6.66944 14 6.83333 14 7C14 7.16667 13.9667 7.33056 13.9 7.49167C13.8333 7.65278 13.7389 7.8 13.6167 7.93333L12.3333 9.23333V11C12.3333 11.3667 12.2028 11.6806 11.9417 11.9417C11.6806 12.2028 11.3667 12.3333 11 12.3333H9.23333L7.93333 13.6167C7.8 13.7389 7.65278 13.8333 7.49167 13.9C7.33056 13.9667 7.16667 14 7 14C6.83333 14 6.66944 13.9667 6.50833 13.9C6.34722 13.8333 6.2 13.7389 6.06667 13.6167L4.76667 12.3333ZM5.33333 11L7 12.6667L8.66667 11H11V8.66667L12.6667 7L11 5.33333V3H8.66667L7 1.33333L5.33333 3H3V5.33333L1.33333 7L3 8.66667V11H5.33333Z"
        fill="#AA0000"
      />
    </svg>
  );
}

export function LeftArrow(svgProps: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      className={`${svgProps.className ?? "fill-[#222222]"}`}
    >
      <path
        d="M0.0500972 6.00005C0.0500972 5.86672 0.0709307 5.74172 0.112597 5.62505C0.154264 5.50838 0.225097 5.40005 0.325097 5.30005L4.9251 0.700049C5.10843 0.516715 5.34176 0.425049 5.6251 0.425049C5.90843 0.425049 6.14176 0.516715 6.3251 0.700049C6.50843 0.883382 6.6001 1.11672 6.6001 1.40005C6.6001 1.68338 6.50843 1.91672 6.3251 2.10005L2.4251 6.00005L6.3251 9.90005C6.50843 10.0834 6.6001 10.3167 6.6001 10.6C6.6001 10.8834 6.50843 11.1167 6.3251 11.3C6.14176 11.4834 5.90843 11.575 5.6251 11.575C5.34176 11.575 5.10843 11.4834 4.9251 11.3L0.325097 6.70005C0.225097 6.60005 0.154264 6.49172 0.112597 6.37505C0.0709307 6.25838 0.0500972 6.13338 0.0500972 6.00005Z"
        fill="parent"
      />
    </svg>
  );
}

export function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={"h-7 w-7 animate-spin stroke-primary " + className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
          stroke="parent"
          stroke-width="3.55556"
          stroke-linecap="round"
        ></path>
      </g>
    </svg>
  );
}
