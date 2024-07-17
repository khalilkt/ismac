import React, { HtmlHTMLAttributes } from "react";
import { ReactNode } from "react";
import { AuthContext } from "../App";
import logo from "../assets/images/logo text.png";
import { LeftArrow } from "./icons";

export function Input({
  ...inputProps
}: {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      {...inputProps}
      className={`rounded-md border border-gray px-3 py-3 text-sm font-light text-black disabled:bg-red-50 disabled:text-gray lg:text-base ${inputProps.className ?? ""}`}
    />
  );
}
export function Select({
  children,
  ...selectedProps
}: { children: React.ReactNode } & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) {
  return (
    <select
      {...selectedProps}
      className={`rounded-md border border-gray px-3 py-3 text-sm font-light text-black lg:text-base`}
    >
      {children}
    </select>
  );
}

export function OutlinedButton({
  children,
  ...btnProps
}: {
  children: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...btnProps}
      className={
        "flex flex-row items-center justify-center gap-x-[10px] rounded-md border border-gray bg-white px-4 py-2 text-center text-black transition-all duration-150 active:scale-95 " +
        (btnProps.className ?? "")
      }
    >
      {children}
    </button>
  );
}

export function FilledButton({
  children,
  isLight = false,
  bg = "secondary",
  ...btnProps
}: {
  children: ReactNode;
  isLight?: boolean;
  bg?: "primary" | "secondary" | "gray";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  let bgColor = "";
  switch (bg) {
    case "primary":
      bgColor = "bg-primary";
      break;
    case "secondary":
      bgColor = "bg-secondary";
      break;
    case "gray":
      bgColor = "bg-gray";
      break;
  }
  return (
    <button
      {...btnProps}
      className={`rounded-lg py-[14px] text-center text-white transition-all duration-150 active:scale-95 ${bgColor} ${btnProps.className}`}
    >
      {children}
    </button>
  );
}

export function DisconnectButton({
  ...btnProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...btnProps}
      className={
        "flex w-max items-center gap-x-3 text-sm text-gray " +
        btnProps.className
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8C8.28333 0 8.52083 0.0958333 8.7125 0.2875C8.90417 0.479167 9 0.716667 9 1C9 1.28333 8.90417 1.52083 8.7125 1.7125C8.52083 1.90417 8.28333 2 8 2H2V16H8C8.28333 16 8.52083 16.0958 8.7125 16.2875C8.90417 16.4792 9 16.7167 9 17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18H2ZM14.175 10H7C6.71667 10 6.47917 9.90417 6.2875 9.7125C6.09583 9.52083 6 9.28333 6 9C6 8.71667 6.09583 8.47917 6.2875 8.2875C6.47917 8.09583 6.71667 8 7 8H14.175L12.3 6.125C12.1167 5.94167 12.025 5.71667 12.025 5.45C12.025 5.18333 12.1167 4.95 12.3 4.75C12.4833 4.55 12.7167 4.44583 13 4.4375C13.2833 4.42917 13.525 4.525 13.725 4.725L17.3 8.3C17.5 8.5 17.6 8.73333 17.6 9C17.6 9.26667 17.5 9.5 17.3 9.7L13.725 13.275C13.525 13.475 13.2875 13.5708 13.0125 13.5625C12.7375 13.5542 12.5 13.45 12.3 13.25C12.1167 13.05 12.0292 12.8125 12.0375 12.5375C12.0458 12.2625 12.1417 12.0333 12.325 11.85L14.175 10Z"
          fill="#888888"
        />
      </svg>
      Se déconnecter
    </button>
  );
}

export function SelectButtonTile({
  icon,
  children,
  ...btnProps
}: {
  icon: ReactNode;
  children: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...btnProps}
      className={
        "flow-row text-medium flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-slate-200 " +
        (btnProps.className ?? "")
      }
    >
      {icon}
      {children}
    </button>
  );
}

export const Title = ({
  children,
  ...spanProps
}: { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) => {
  return (
    <h1 className={`text-3xl font-semibold ${spanProps.className ?? ""}`}>
      {children}
    </h1>
  );
};
export function LogoutButton({ className }: { className?: string }) {
  const authContext = React.useContext(AuthContext);
  return (
    <button
      onClick={() => {
        authContext.logOut();
        window.location.href = "/";
      }}
      className={`flex items-center gap-x-2 text-textGray ${className ?? ""}`}
    >
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.49857 8.45832L8.1944 13.1542C8.38607 13.3458 8.47791 13.5694 8.46992 13.825C8.46194 14.0805 8.36211 14.3042 8.17044 14.4958C7.97878 14.6715 7.75517 14.7634 7.49961 14.7713C7.24405 14.7793 7.02044 14.6875 6.82878 14.4958L0.503776 8.17082C0.407943 8.07499 0.340061 7.97117 0.30013 7.85937C0.2602 7.74756 0.240234 7.62777 0.240234 7.49999C0.240234 7.37221 0.2602 7.25242 0.30013 7.14062C0.340061 7.02881 0.407943 6.92499 0.503776 6.82916L6.82878 0.504158C7.00447 0.328463 7.22409 0.240616 7.48763 0.240616C7.75117 0.240616 7.97878 0.328463 8.17044 0.504158C8.36211 0.695824 8.45794 0.923428 8.45794 1.18697C8.45794 1.45051 8.36211 1.67812 8.17044 1.86978L3.49857 6.54166H14.2079C14.4795 6.54166 14.7071 6.6335 14.8908 6.81718C15.0744 7.00086 15.1663 7.22846 15.1663 7.49999C15.1663 7.77152 15.0744 7.99912 14.8908 8.1828C14.7071 8.36648 14.4795 8.45832 14.2079 8.45832H3.49857Z"
          fill="#848484"
        />
      </svg>

      <span> Retour connexion</span>
    </button>
  );
}
export const SubTitle = ({
  children,
  ...spanProps
}: { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) => {
  return (
    <span {...spanProps} className={`text-gray ${spanProps.className ?? ""}`}>
      {children}
    </span>
  );
};

export function MDiv({
  withLogo = true,
  ...divProps
}: { withLogo?: boolean } & HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-gray bg-white p-8 lg:p-16 ${divProps.className ?? ""}`}
    >
      {withLogo && <img src={logo} alt="logo" className="mb-8 w-[91px]" />}
      {divProps.children}
    </div>
  );
}

export function Pagination({
  onItemClick,
  current,
  total,
  className = "",
}: {
  current: number;
  total: number;
  onItemClick: (page: number) => void;
  className?: string;
}) {
  function Item({ page }: { page: number | null }) {
    return (
      <li
        onClick={() => {
          if (page) onItemClick(page);
        }}
        className={`flex h-10 cursor-pointer items-center justify-center border border-lightGray px-4 leading-tight text-black ${page === current ? "bg-lightGray" : "hover:bg-primaryLight"}`}
      >
        {page ?? "..."}
      </li>
    );
  }

  const firstPage = Math.max(1, current - 2);
  const lastPage = Math.min(total, firstPage + 4);

  return (
    <ul
      className={`inline-flex h-10 w-min -space-x-px self-center text-base font-medium ${className}`}
    >
      {current !== 1 && (
        <li
          onClick={() => {
            onItemClick(current - 1);
          }}
          className="text-gray-500 ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-lightGray px-4 leading-tight hover:bg-lightGray"
        >
          <LeftArrow />
        </li>
      )}
      {Array.from({ length: lastPage - firstPage + 1 }).map((_, i) => (
        <Item key={i} page={firstPage + i} />
      ))}
      {current !== total && (
        <li
          onClick={() => {
            onItemClick(current + 1);
          }}
          className="text-gray-500 ms-0 flex h-10 rotate-180 transform cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-lightGray px-4 leading-tight hover:bg-lightGray"
        >
          <LeftArrow />
        </li>
      )}
    </ul>
  );
}
