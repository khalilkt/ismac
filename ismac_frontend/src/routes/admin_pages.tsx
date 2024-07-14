import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FilledButton,
  Input,
  LogoutButton,
  Pagination,
  Title,
} from "../comps/comps";
import { useSearchParams } from "react-router-dom";
import { StudentDataInterface, UserInterface } from "../App";
import { rootUrl } from "../constants";
import axios from "axios";
import { AuthContext } from "../App";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingIcon } from "../comps/icons";

export interface PaginatedData<T> {
  count: number;
  page: number;
  total_pages: number;
  data: T[];
}

export function MDialog({
  children,
  isOpen,
  title,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex items-center justify-center bg-gray opacity-70" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-20 flex h-min w-screen -translate-x-1/2 -translate-y-1/2 lg:h-max lg:max-h-[90%] lg:w-max lg:rounded-2xl"
          forceMount
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="h-min w-full flex-col overflow-y-auto rounded-xl bg-white px-6 py-8 shadow-lg lg:h-auto lg:w-auto"
              >
                <h2 className="pb-8 text-xl font-semibold">{title}</h2>
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function formatDownloadLink(url: string) {
  if (rootUrl.startsWith("https")) {
    url = url.replace("http://", "https://");
  }
  return url;
}

function SearchInput({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) {
  const searchTimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const searchBar = document.getElementById("search-bar");

    if (searchBar) {
      (searchBar as HTMLInputElement).value = initialValue;
    }
  }, []);

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;

    clearTimeout(searchTimer.current!);
    searchTimer.current = setTimeout(() => {
      onChange(search);
    }, 500);
  }

  return (
    <label className="relative h-max w-[300px]">
      <input
        onChange={onSearchChange}
        placeholder="Rechercher"
        type="search"
        id="search-bar"
        className="relative rounded-lg border border-gray px-3 py-2 pl-10"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-y-0 left-3 top-[12px] z-10 h-5 w-5 stroke-gray"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="inherit"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </label>
  );
}
function BulkAddStudentsDialog({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useContext(AuthContext).authData?.token;

  async function post() {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        rootUrl + "students/accept/",
        {
          students: value.split("\n").filter((v) => v.trim()),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      onDone();
    } catch (e) {
      alert("Erreur lors de l'ajout des étudiants");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex w-[400px] flex-col gap-y-4">
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="max-h-[200px] min-h-[200px] w-full rounded-lg border border-gray px-6 py-4"
      />
      {value.split("\n").filter((v) => v.trim().length > 0).length > 0 && (
        <span className="text-textGray">
          {value.split("\n").filter((v) => v.trim().length > 0).length}{" "}
          étudiants seront ajoutés à la liste des candidats
        </span>
      )}
      <button
        disabled={
          value.split("\n").filter((v) => v.trim().length > 0).length === 0
        }
        onClick={post}
        className="w-full self-end rounded-lg bg-secondary px-4 py-2 text-center text-white transition-all active:scale-90 disabled:opacity-40 disabled:active:scale-100"
      >
        {isSubmitting ? (
          <LoadingIcon className="mx-auto stroke-white" />
        ) : (
          "Ajouter"
        )}
      </button>
    </div>
  );
}
export function AdminListPage({ type }: { type: "oral" | "ecrit" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<PaginatedData<StudentDataInterface> | null>(
    null,
  );
  const token = useContext(AuthContext).authData?.token;

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    load();
  }, [searchParams, type]);

  async function load() {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    setData(null);
    const res = await axios.get<PaginatedData<StudentDataInterface>>(
      rootUrl + "students",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: params,
      },
    );
    setData(res.data);
  }
  let emptyMessage = "";
  if (data && data.data.length === 0) {
    if (searchParams.get("search")?.length ?? 0 > 0) {
      emptyMessage = "Pas de résultats pour cette recherche";
    } else {
      emptyMessage =
        type === "oral"
          ? "Pas d'étudiants ajoutés"
          : "Pas de candidats pour le moment";
    }
  }
  return (
    <div className="flex flex-col px-9">
      <MDialog
        isOpen={dialogOpen}
        title="Ajouter un étudiant"
        onClose={() => setDialogOpen(false)}
      >
        <BulkAddStudentsDialog
          onDone={() => {
            setDialogOpen(false);
            load();
          }}
        />
      </MDialog>
      <h1 className="my-10 text-2xl">
        {type === "oral" ? "Test Oral" : "Test ecrit"}
      </h1>
      <div className="flex w-full justify-between">
        <SearchInput
          initialValue={searchParams.get("search") ?? ""}
          onChange={function (value: string): void {
            if (value === "") {
              setSearchParams((params) => {
                params.delete("search");
                return params;
              });
              return;
            }
            setSearchParams((params) => {
              params.set("search", value);
              return params;
            });
          }}
        />
        {type === "oral" && (
          <button
            onClick={() => {
              setDialogOpen(true);
            }}
            className="ml-4 rounded-lg bg-secondary px-4 py-2 text-white transition-all active:scale-90"
          >
            Ajouter
          </button>
        )}
      </div>
      {emptyMessage && (
        <div className="mt-20 w-full self-center text-center text-lg font-medium text-textGray">
          {emptyMessage}
        </div>
      )}
      {!data ||
        (data.data.length > 0 && (
          <table className="mb-10 mt-8 w-full">
            <thead>
              <tr className="">
                <th className="border border-gray px-4 py-2 font-normal">
                  Date préinscription
                </th>
                <th className="w-[20%] border border-gray px-4 py-2 font-normal">
                  Nom Complet
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Date de naissance
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Code Massar
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Branche
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Année du Bac
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Note du Bac
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Filière
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  {type === "ecrit" ? "Dossier" : "Portfolio"}
                </th>
              </tr>
            </thead>
            <tbody>
              {!data &&
                [...Array(9)].map((_, i) => (
                  <tr>
                    {[...Array(9)].map((_, i) => (
                      <td
                        key={i}
                        className="border border-gray object-center px-4 py-2"
                      >
                        <div className="h-6 w-[70%] animate-pulse rounded bg-gray" />
                      </td>
                    ))}
                  </tr>
                ))}
              {data &&
                data.data.map((student) => (
                  <tr key={student.id} className="border-b border-gray">
                    <td className="border border-gray px-4 py-2">
                      {formatDate(student.created_at)}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.date_of_birth}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.codeMassar}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.departement}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.bac_year}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.bac_note}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.filiere}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {
                        <a
                          href={formatDownloadLink(
                            type === "ecrit"
                              ? student.condidatureFile
                              : student.portfolio_file ?? "",
                          )}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          {type === "ecrit"
                            ? "Voir le dossier"
                            : "Voir le portfolio"}
                        </a>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ))}
      {data && data.total_pages > 1 && (
        <Pagination
          className="mb-10 self-center"
          onItemClick={(page) => {
            setSearchParams((params) => {
              params.set("page", page.toString());
              return params;
            });
            // if mobile scroll to the top
            window.scrollTo(0, 0);
          }}
          current={
            searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
          }
          total={data?.total_pages ?? 1}
        />
      )}
    </div>
  );
}
