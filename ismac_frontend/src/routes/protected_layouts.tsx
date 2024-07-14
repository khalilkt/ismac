import { useContext } from "react";
import { AuthContext } from "../App";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`rounded-xl p-[14px] ${isActive ? "bg-secondary bg-opacity-20 fill-secondary" : "fill-textGray hover:bg-gray hover:bg-opacity-40"}`}
    >
      {children}
    </Link>
  );
}

export function AdminLayout() {
  return (
    <div className="flex h-screen">
      <ul className="flex w-24 flex-col items-center gap-y-5 border-r border-r-gray pt-20">
        <NavLink to="/admin/ecrit">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4138 8C13.8476 8 13.3628 7.80833 12.9596 7.425C12.5563 7.04167 12.3547 6.56667 12.3547 6V2C12.3547 1.43333 12.5563 0.958333 12.9596 0.575C13.3628 0.191667 13.8476 0 14.4138 0C14.9972 0 15.4863 0.191667 15.8809 0.575C16.2756 0.958333 16.4729 1.43333 16.4729 2V6C16.4729 6.56667 16.2756 7.04167 15.8809 7.425C15.4863 7.80833 14.9972 8 14.4138 8ZM2.05912 20C1.49286 20 1.00811 19.8042 0.604866 19.4125C0.201622 19.0208 0 18.55 0 18V2C0 1.45 0.201622 0.979167 0.604866 0.5875C1.00811 0.195833 1.49286 0 2.05912 0H9.26602C9.55773 0 9.80225 0.0958333 9.99959 0.2875C10.1969 0.479167 10.2956 0.716667 10.2956 1C10.2956 1.28333 10.1969 1.52083 9.99959 1.7125C9.80225 1.90417 9.55773 2 9.26602 2H2.05912V18H13.3843V17C13.3843 16.7167 13.4829 16.4792 13.6803 16.2875C13.8776 16.0958 14.1221 16 14.4138 16C14.7055 16 14.95 16.0958 15.1474 16.2875C15.3447 16.4792 15.4434 16.7167 15.4434 17V18C15.4434 18.55 15.2418 19.0208 14.8385 19.4125C14.4353 19.8042 13.9505 20 13.3843 20H2.05912ZM10.2956 16H5.14779C4.85608 16 4.61156 15.9042 4.41423 15.7125C4.2169 15.5208 4.11823 15.2833 4.11823 15C4.11823 14.7167 4.2169 14.4792 4.41423 14.2875C4.61156 14.0958 4.85608 14 5.14779 14H10.2956C10.5873 14 10.8318 14.0958 11.0291 14.2875C11.2265 14.4792 11.3251 14.7167 11.3251 15C11.3251 15.2833 11.2265 15.5208 11.0291 15.7125C10.8318 15.9042 10.5873 16 10.2956 16ZM8.23647 13H5.14779C4.85608 13 4.61156 12.9042 4.41423 12.7125C4.2169 12.5208 4.11823 12.2833 4.11823 12C4.11823 11.7167 4.2169 11.4792 4.41423 11.2875C4.61156 11.0958 4.85608 11 5.14779 11H8.23647C8.52817 11 8.7727 11.0958 8.97003 11.2875C9.16736 11.4792 9.26602 11.7167 9.26602 12C9.26602 12.2833 9.16736 12.5208 8.97003 12.7125C8.7727 12.9042 8.52817 13 8.23647 13ZM14.4138 9.5C15.2375 9.5 15.9582 9.27083 16.5759 8.8125C17.1936 8.35417 17.6226 7.76667 17.8628 7.05C17.9486 6.76667 18.0945 6.52083 18.3004 6.3125C18.5063 6.10417 18.7551 6 19.0468 6C19.3385 6 19.5831 6.1125 19.7804 6.3375C19.9777 6.5625 20.0421 6.81667 19.9734 7.1C19.7332 8.2 19.2056 9.14167 18.3905 9.925C17.5754 10.7083 16.593 11.2 15.4434 11.4V13C15.4434 13.2833 15.3447 13.5208 15.1474 13.7125C14.95 13.9042 14.7055 14 14.4138 14C14.1221 14 13.8776 13.9042 13.6803 13.7125C13.4829 13.5208 13.3843 13.2833 13.3843 13V11.4C12.2517 11.2 11.2737 10.7083 10.45 9.925C9.62637 9.14167 9.09443 8.2 8.8542 7.1C8.78556 6.81667 8.84991 6.5625 9.04724 6.3375C9.24458 6.1125 9.4891 6 9.7808 6C10.0725 6 10.3213 6.10417 10.5272 6.3125C10.7331 6.52083 10.879 6.76667 10.9648 7.05C11.205 7.76667 11.6383 8.35417 12.2646 8.8125C12.8909 9.27083 13.6073 9.5 14.4138 9.5Z"
              fill="inherit"
            />
          </svg>
        </NavLink>
        <NavLink to="/admin/oral">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 5H14C14.2833 5 14.5208 5.09583 14.7125 5.2875C14.9042 5.47917 15 5.71667 15 6C15 6.28333 14.9042 6.52083 14.7125 6.7125C14.5208 6.90417 14.2833 7 14 7H7C6.71667 7 6.47917 6.90417 6.2875 6.7125C6.09583 6.52083 6 6.28333 6 6C6 5.71667 6.09583 5.47917 6.2875 5.2875C6.47917 5.09583 6.71667 5 7 5ZM7 8H14C14.2833 8 14.5208 8.09583 14.7125 8.2875C14.9042 8.47917 15 8.71667 15 9C15 9.28333 14.9042 9.52083 14.7125 9.7125C14.5208 9.90417 14.2833 10 14 10H7C6.71667 10 6.47917 9.90417 6.2875 9.7125C6.09583 9.52083 6 9.28333 6 9C6 8.71667 6.09583 8.47917 6.2875 8.2875C6.47917 8.09583 6.71667 8 7 8ZM3 20C2.16667 20 1.45833 19.7083 0.875 19.125C0.291667 18.5417 0 17.8333 0 17V15C0 14.7167 0.0958333 14.4792 0.2875 14.2875C0.479167 14.0958 0.716667 14 1 14H3V2C3 1.45 3.19583 0.979167 3.5875 0.5875C3.97917 0.195833 4.45 0 5 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V8C18 8.28333 17.9042 8.52083 17.7125 8.7125C17.5208 8.90417 17.2833 9 17 9C16.7167 9 16.4792 8.90417 16.2875 8.7125C16.0958 8.52083 16 8.28333 16 8V2H5V14H8C8.28333 14 8.52083 14.0958 8.7125 14.2875C8.90417 14.4792 9 14.7167 9 15C9 15.2833 8.90417 15.5208 8.7125 15.7125C8.52083 15.9042 8.28333 16 8 16H2V17C2 17.2833 2.09583 17.5208 2.2875 17.7125C2.47917 17.9042 2.71667 18 3 18H8C8.28333 18 8.52083 18.0958 8.7125 18.2875C8.90417 18.4792 9 18.7167 9 19C9 19.2833 8.90417 19.5208 8.7125 19.7125C8.52083 19.9042 8.28333 20 8 20H3ZM11 19V17.35C11 17.2167 11.025 17.0875 11.075 16.9625C11.125 16.8375 11.2 16.725 11.3 16.625L16.525 11.425C16.675 11.275 16.8417 11.1667 17.025 11.1C17.2083 11.0333 17.3917 11 17.575 11C17.775 11 17.9667 11.0375 18.15 11.1125C18.3333 11.1875 18.5 11.3 18.65 11.45L19.575 12.375C19.7083 12.525 19.8125 12.6917 19.8875 12.875C19.9625 13.0583 20 13.2417 20 13.425C20 13.6083 19.9667 13.7958 19.9 13.9875C19.8333 14.1792 19.725 14.35 19.575 14.5L14.375 19.7C14.275 19.8 14.1625 19.875 14.0375 19.925C13.9125 19.975 13.7833 20 13.65 20H12C11.7167 20 11.4792 19.9042 11.2875 19.7125C11.0958 19.5208 11 19.2833 11 19ZM12.5 18.5H13.45L16.475 15.45L16.025 14.975L15.55 14.525L12.5 17.55V18.5ZM16.025 14.975L15.55 14.525L16.475 15.45L16.025 14.975Z"
              fill="inherit"
            />
          </svg>
        </NavLink>
      </ul>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
export function ProtectedLayout({
  shouldBeLogged,
  isAdmin = null,
}: {
  shouldBeLogged: boolean;
  isAdmin?: boolean | null;
}) {
  const authContext = React.useContext(AuthContext);
  const user = authContext.authData?.user ?? null;

  if (user === null && shouldBeLogged) {
    return <Navigate to="/" />;
  }
  if (user !== null && !shouldBeLogged) {
    return <Navigate to="/resume" />;
  }
  if (user && isAdmin !== null) {
    if (isAdmin === true && user.is_admin === false) {
      return <Navigate to="/resume" />;
    } else if (isAdmin === false && user.is_admin === true) {
      return <Navigate to="/admin" />;
    }
  }
  if (isAdmin === true && user) {
    return <AdminLayout />;
  }
  return <Outlet />;
}