import { ReactNode, useState } from "react";
import { ErrorIcon } from "./icons";
import { Input } from "./comps";
import * as Popover from "@radix-ui/react-popover";
import ReactCountryFlag from "react-country-flag";

const ImageIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.25 32.2238C3.2875 32.2238 2.46354 31.8787 1.77813 31.1886C1.09271 30.4986 0.75 29.669 0.75 28.6999V4.03304C0.75 3.06398 1.09271 2.23441 1.77813 1.54432C2.46354 0.854236 3.2875 0.509193 4.25 0.509193H18.25C18.7458 0.509193 19.1615 0.678044 19.4969 1.01575C19.8323 1.35345 20 1.7719 20 2.27111C20 2.77033 19.8323 3.18878 19.4969 3.52648C19.1615 3.86418 18.7458 4.03304 18.25 4.03304H4.25V28.6999H28.75V14.6046C28.75 14.1053 28.9177 13.6869 29.2531 13.3492C29.5885 13.0115 30.0042 12.8426 30.5 12.8426C30.9958 12.8426 31.4115 13.0115 31.7469 13.3492C32.0823 13.6869 32.25 14.1053 32.25 14.6046V28.6999C32.25 29.669 31.9073 30.4986 31.2219 31.1886C30.5365 31.8787 29.7125 32.2238 28.75 32.2238H4.25ZM25.25 7.55688H23.5C23.0042 7.55688 22.5885 7.38803 22.2531 7.05032C21.9177 6.71262 21.75 6.29417 21.75 5.79496C21.75 5.29575 21.9177 4.87729 22.2531 4.53959C22.5885 4.20189 23.0042 4.03304 23.5 4.03304H25.25V2.27111C25.25 1.7719 25.4177 1.35345 25.7531 1.01575C26.0885 0.678044 26.5042 0.509193 27 0.509193C27.4958 0.509193 27.9115 0.678044 28.2469 1.01575C28.5823 1.35345 28.75 1.7719 28.75 2.27111V4.03304H30.5C30.9958 4.03304 31.4115 4.20189 31.7469 4.53959C32.0823 4.87729 32.25 5.29575 32.25 5.79496C32.25 6.29417 32.0823 6.71262 31.7469 7.05032C31.4115 7.38803 30.9958 7.55688 30.5 7.55688H28.75V9.3188C28.75 9.81801 28.5823 10.2365 28.2469 10.5742C27.9115 10.9119 27.4958 11.0807 27 11.0807C26.5042 11.0807 26.0885 10.9119 25.7531 10.5742C25.4177 10.2365 25.25 9.81801 25.25 9.3188V7.55688ZM15.1875 23.4142L11.95 19.0534C11.775 18.8185 11.5417 18.701 11.25 18.701C10.9583 18.701 10.725 18.8185 10.55 19.0534L7.05 23.7666C6.81667 24.0602 6.7875 24.3685 6.9625 24.6916C7.1375 25.0146 7.4 25.1761 7.75 25.1761H25.25C25.6 25.1761 25.8625 25.0146 26.0375 24.6916C26.2125 24.3685 26.1833 24.0602 25.95 23.7666L21.1375 17.2915C20.9625 17.0566 20.7292 16.9391 20.4375 16.9391C20.1458 16.9391 19.9125 17.0566 19.7375 17.2915L15.1875 23.4142Z"
      fill="#3259E8"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    width="42"
    height="43"
    viewBox="0 0 43 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_100_3533"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="43"
      height="42"
    >
      <rect x="0.5" width="42" height="42" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_100_3533)">
      <path
        d="M21.0625 38.5C18.0292 38.5 15.4479 37.4354 13.3188 35.3063C11.1896 33.1771 10.125 30.5958 10.125 27.5625V11.375C10.125 9.1875 10.8906 7.32812 12.4219 5.79688C13.9531 4.26562 15.8125 3.5 18 3.5C20.1875 3.5 22.0469 4.26562 23.5781 5.79688C25.1094 7.32812 25.875 9.1875 25.875 11.375V22.75C25.875 23.2458 25.7073 23.6615 25.3719 23.9969C25.0365 24.3323 24.6208 24.5 24.125 24.5C23.6292 24.5 23.2135 24.3323 22.8781 23.9969C22.5427 23.6615 22.375 23.2458 22.375 22.75V11.375C22.3458 10.15 21.9156 9.11458 21.0844 8.26875C20.2531 7.42292 19.225 7 18 7C16.775 7 15.7396 7.42292 14.8938 8.26875C14.0479 9.11458 13.625 10.15 13.625 11.375V27.5625C13.5958 29.6333 14.3104 31.3906 15.7688 32.8344C17.2271 34.2781 18.9917 35 21.0625 35C21.5583 35 22.025 34.949 22.4625 34.8469C22.9 34.7448 23.3229 34.6208 23.7312 34.475C24.1979 34.3 24.65 34.3073 25.0875 34.4969C25.525 34.6865 25.8312 35.0146 26.0062 35.4812C26.1812 35.9479 26.174 36.4 25.9844 36.8375C25.7948 37.275 25.4667 37.5813 25 37.7563C24.3875 37.9896 23.7531 38.1719 23.0969 38.3031C22.4406 38.4344 21.7625 38.5 21.0625 38.5ZM30.25 36.75C29.7542 36.75 29.3385 36.5823 29.0031 36.2469C28.6677 35.9115 28.5 35.4958 28.5 35V31.5H25C24.5042 31.5 24.0885 31.3323 23.7531 30.9969C23.4177 30.6615 23.25 30.2458 23.25 29.75C23.25 29.2542 23.4177 28.8385 23.7531 28.5031C24.0885 28.1677 24.5042 28 25 28H28.5V24.5C28.5 24.0042 28.6677 23.5885 29.0031 23.2531C29.3385 22.9177 29.7542 22.75 30.25 22.75C30.7458 22.75 31.1615 22.9177 31.4969 23.2531C31.8323 23.5885 32 24.0042 32 24.5V28H35.5C35.9958 28 36.4115 28.1677 36.7469 28.5031C37.0823 28.8385 37.25 29.2542 37.25 29.75C37.25 30.2458 37.0823 30.6615 36.7469 30.9969C36.4115 31.3323 35.9958 31.5 35.5 31.5H32V35C32 35.4958 31.8323 35.9115 31.4969 36.2469C31.1615 36.5823 30.7458 36.75 30.25 36.75ZM18 29.75C17.5042 29.75 17.0885 29.5823 16.7531 29.2469C16.4177 28.9115 16.25 28.4958 16.25 28V12.25C16.25 11.7542 16.4177 11.3385 16.7531 11.0031C17.0885 10.6677 17.5042 10.5 18 10.5C18.4958 10.5 18.9115 10.6677 19.2469 11.0031C19.5823 11.3385 19.75 11.7542 19.75 12.25V28C19.75 28.4958 19.5823 28.9115 19.2469 29.2469C18.9115 29.5823 18.4958 29.75 18 29.75ZM30.25 19.25C29.7542 19.25 29.3385 19.0823 29.0031 18.7469C28.6677 18.4115 28.5 17.9958 28.5 17.5V12.25C28.5 11.7542 28.6677 11.3385 29.0031 11.0031C29.3385 10.6677 29.7542 10.5 30.25 10.5C30.7458 10.5 31.1615 10.6677 31.4969 11.0031C31.8323 11.3385 32 11.7542 32 12.25V17.5C32 17.9958 31.8323 18.4115 31.4969 18.7469C31.1615 19.0823 30.7458 19.25 30.25 19.25Z"
        fill="#3259E8"
      />
    </g>
  </svg>
);

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1 flex items-center gap-x-2">
      <ErrorIcon />
      <span className="text-sm text-error">{children}</span>
    </div>
  );
}

export function Labeled({
  label,
  children,
  ...divProps
}: { label: string; children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      {...divProps}
      className={`flex flex-col gap-y-3 ${divProps.className}`}
    >
      <span className="">{label}</span>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function ProfilePictureInput({
  file,
  error,
  onChange,
}: {
  file: File | null;
  error: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={`bg-gray-50 relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed ${error ? "border-error" : "border-secondary"} bg-secondary bg-opacity-[8%]`}
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className={`${true ? "h-[92px] w-[92px]" : ""} rounded-full object-cover`}
        />
      ) : (
        <ImageIcon />
      )}

      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChange && onChange(e);
          }
        }}
      />
    </label>
  );
}

export function FileInput({
  file,
  type,
  error,
  mini = false,

  ...inputProps
}: {
  file: File | null;
  error: string;
  type: "file" | "image";
  mini?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  const isImage = file?.type.startsWith("image/");
  return (
    <div className="col-span-2 flex flex-col gap-y-1">
      <label
        className={`bg-gray-50 flex ${mini ? "h-36" : "h-64"} w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary bg-opacity-[8%] text-sm lg:text-base`}
      >
        {file ? (
          file && (
            <div className="mt-2">
              {isImage ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className={`${mini ? "h-32" : "h-60"} rounded-lg object-cover`}
                />
              ) : (
                <span className="font-medium text-secondary underline">
                  {file.name}
                </span>
              )}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {type === "file" ? <FileIcon /> : <ImageIcon />}
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
              <span className="text-secondary underline">
                Cliquez pour télécharger
              </span>
              ou glisser pour déposer
            </p>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              inputProps.onChange && inputProps.onChange(e);
            }
          }}
        />
      </label>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

interface OptionInterface {
  value: string;
  icon?: ReactNode;
}

export function SearchSelect({
  value,
  onChange: setValue,
  options,
  placeholder: placeHolder = "Rechercher",
}: {
  value: string;
  onChange: (value: string) => void;
  options: OptionInterface[];
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption =
    options.find(
      (option) => option.value.toLowerCase() === value.toLowerCase(),
    ) ?? null;

  const filteredOptions = options
    .filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase()),
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Input
          placeholder={placeHolder}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
            if (e.key === "Enter" && filteredOptions.length > 0) {
              setValue(filteredOptions[0]?.value ?? value);
              setIsOpen(false);
            }
          }}
          className={`w-full focus:outline-none ${isOpen ? "w-full rounded-b-none" : ""} ${selectedOption && selectedOption.icon ? "pl-10" : ""}`}
          value={value}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
        />
        {selectedOption && selectedOption.icon && (
          <div className="absolute left-0 top-0 flex h-full items-center px-3">
            {selectedOption.icon}
          </div>
        )}
        <div
          className={`absolute right-0 top-0 flex h-full items-center px-3 transition-all duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10.6667L4.66667 7.33333L5.75333 6.24667L8 8.49333L10.2467 6.24667L11.3333 7.33333L8 10.6667Z"
              fill="#4B5563"
            />
          </svg>
        </div>
      </div>
      <Popover.Root
        open={isOpen}
        onOpenChange={(v) => {
          setIsOpen(v);
        }}
      >
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            avoidCollisions={false}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-content-available-height)]"
          >
            <div
              className={`rounded-b border-x border-b border-gray bg-white shadow-xl ${isOpen ? "" : "hidden"}`}
            >
              {filteredOptions.length === 0 ? (
                <div className="flex w-full items-center gap-x-3 border-b border-gray px-3 py-3 text-black last:border-b-0">
                  <span>Aucun résultat</span>
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setValue(option.value);
                      setIsOpen(false);
                    }}
                    className="textlin flex w-full items-center gap-x-3 text-ellipsis border-b border-gray px-3 py-3 text-black last:border-b-0"
                  >
                    {option.icon}
                    <span className="line-clamp-1">{option.value}</span>
                  </button>
                ))
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
