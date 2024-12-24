import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FilledButton,
  Input,
  LogoutButton,
  OutlinedButton,
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

export function DeleteIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.8335 15.5C2.37516 15.5 1.9828 15.3368 1.65641 15.0104C1.33002 14.684 1.16683 14.2917 1.16683 13.8333V3C0.930718 3 0.732802 2.92014 0.573079 2.76042C0.413357 2.60069 0.333496 2.40278 0.333496 2.16667C0.333496 1.93056 0.413357 1.73264 0.573079 1.57292C0.732802 1.41319 0.930718 1.33333 1.16683 1.33333H4.50016C4.50016 1.09722 4.58002 0.899306 4.73975 0.739583C4.89947 0.579861 5.09738 0.5 5.3335 0.5H8.66683C8.90294 0.5 9.10086 0.579861 9.26058 0.739583C9.4203 0.899306 9.50016 1.09722 9.50016 1.33333H12.8335C13.0696 1.33333 13.2675 1.41319 13.4272 1.57292C13.587 1.73264 13.6668 1.93056 13.6668 2.16667C13.6668 2.40278 13.587 2.60069 13.4272 2.76042C13.2675 2.92014 13.0696 3 12.8335 3V13.8333C12.8335 14.2917 12.6703 14.684 12.3439 15.0104C12.0175 15.3368 11.6252 15.5 11.1668 15.5H2.8335ZM11.1668 3H2.8335V13.8333H11.1668V3ZM5.3335 12.1667C5.56961 12.1667 5.76752 12.0868 5.92725 11.9271C6.08697 11.7674 6.16683 11.5694 6.16683 11.3333V5.5C6.16683 5.26389 6.08697 5.06597 5.92725 4.90625C5.76752 4.74653 5.56961 4.66667 5.3335 4.66667C5.09738 4.66667 4.89947 4.74653 4.73975 4.90625C4.58002 5.06597 4.50016 5.26389 4.50016 5.5V11.3333C4.50016 11.5694 4.58002 11.7674 4.73975 11.9271C4.89947 12.0868 5.09738 12.1667 5.3335 12.1667ZM8.66683 12.1667C8.90294 12.1667 9.10086 12.0868 9.26058 11.9271C9.4203 11.7674 9.50016 11.5694 9.50016 11.3333V5.5C9.50016 5.26389 9.4203 5.06597 9.26058 4.90625C9.10086 4.74653 8.90294 4.66667 8.66683 4.66667C8.43072 4.66667 8.2328 4.74653 8.07308 4.90625C7.91336 5.06597 7.8335 5.26389 7.8335 5.5V11.3333C7.8335 11.5694 7.91336 11.7674 8.07308 11.9271C8.2328 12.0868 8.43072 12.1667 8.66683 12.1667Z"
        fill="#888888"
      />
    </svg>
  );
}

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

function formatDateTime(date: string) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

function formatDownloadLink(url: string) {
  if (!url) return url;
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
    <label className="relative h-max">
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
        className="w-full self-end rounded-lg bg-primary px-4 py-2 text-center text-white transition-all active:scale-90 disabled:opacity-40 disabled:active:scale-100"
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
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

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
        isOpen={deletingId !== null}
        title="Confirmer la suppression"
        onClose={() => setDeletingId(null)}
      >
        <div className="flex flex-col items-center">
          <p>
            Vous êtes sur le point de supprimer un étudiant de la base de
            données.
            <br /> Veuillez confirmer cette action.
          </p>
          <div className="mt-10 flex w-full flex-row gap-x-4">
            <OutlinedButton
              onClick={() => {
                setDeletingId(null);
              }}
              className="flex-1"
            >
              Annuler
            </OutlinedButton>
            <FilledButton
              onClick={() => {
                setDeletingId(null);
                axios
                  .delete(rootUrl + "students/" + deletingId + "/", {
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  })
                  .then((response) => {
                    load();
                  });
              }}
              className="flex-1 bg-error text-white"
            >
              Confirmer
            </FilledButton>
          </div>
        </div>
      </MDialog>
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
        <div className="flex gap-x-4">
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
          {type === "ecrit" && (
            <select
              onChange={(e) => {
                const v = e.target.value;
                if (v == "") {
                  setSearchParams((params) => {
                    params.delete("program");
                    return params;
                  });
                  return;
                }
                setSearchParams((params) => {
                  params.set("program", e.target.value);
                  return params;
                });
              }}
              className="rounded-lg border border-gray px-4 py-2"
            >
              <option value="">Tous</option>
              <option value="master">Master</option>
              <option value="licence">Licence</option>
            </select>
          )}
        </div>
        {type === "oral" ? (
          <button
            onClick={() => {
              setDialogOpen(true);
            }}
            className="ml-4 rounded-lg bg-primary px-4 py-2 text-white transition-all active:scale-90"
          >
            Ajouter
          </button>
        ) : (
          <button
            onClick={() => {
              // rootUrl + "students/data/"
              const program = searchParams.get("program");
              if (!program ||["licence", "master"].indexOf(program) === -1) {
                alert("Veuillez choisir un programme");
                return;
              }
              let url = rootUrl + "students/data/";
              if (program) {
                url += `?program=${program}`;
              }
              // just open the url in a new tab
              window.open(url, "_blank");
            }}
            className="ml-4 rounded-lg bg-primary px-4 py-2 text-white transition-all active:scale-90"
          >
            Imprimer
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
                <th className="border border-gray px-4 py-2 font-normal">
                  Prénom
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Nom
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  CIN
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Email
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Code Massar
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Moyenne Gen
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  Licence
                </th>
                <th className="border border-gray px-4 py-2 font-normal">
                  {type === "ecrit" ? "Dossier" : "Portfolio"}
                </th>
                {type === "ecrit" && (
                  <th className="border border-gray px-4 py-2 font-normal">
                    Actions
                  </th>
                )}
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
                      {formatDateTime(student.created_at)}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.first_name}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.last_name}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.cin}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.email}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.codeMassar}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.diplome_note}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {student.licence_name ?? "-"}
                    </td>
                    <td className="border border-gray px-4 py-2">
                      {type === "ecrit" &&
                        (student.condidatureFile ? (
                          <a
                            href={formatDownloadLink(student.condidatureFile)}
                            target="_blank"
                            className="text-blue-500 underline"
                          >
                            Voir le dossier
                          </a>
                        ) : (
                          <span className="mx-auto text-center font-semibold">
                            -
                          </span>
                        ))}
                      {type === "oral" &&
                        (student.portfolio_file ? (
                          <a
                            href={formatDownloadLink(
                              student.portfolio_file ?? "",
                            )}
                            target="_blank"
                            className="text-blue-500 underline"
                          >
                            Voir le portfolio
                          </a>
                        ) : (
                          <span className="mx-auto text-center font-semibold">
                            -
                          </span>
                        ))}
                    </td>
                    {type === "ecrit" && (
                      <td className="border border-gray px-4 py-2">
                        <button
                          onClick={() => {
                            setDeletingId(student.id);
                          }}
                          className="flex items-center justify-center transition-all duration-100 active:scale-90"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    )}
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
