import ModalTriggerButton from "@/components/ModalTriggerButton";
import { CategoryList } from "@/lib/types";
import { memo } from "react";
import { POSTSECTION_TEXT } from "..";

interface CategoryModalButtonProps {
  currentCategories: string[];
  onChange: React.ChangeEventHandler<HTMLDivElement>;
  categorys: CategoryList;
}

const CategoryModalButton = ({
  categorys,
  onChange,
  currentCategories,
}: CategoryModalButtonProps) => {
  return (
    <ModalTriggerButton
      title={POSTSECTION_TEXT.header.categoryButton.text}
      icon={POSTSECTION_TEXT.header.categoryButton.svg}
      containerProps={{ onChange }}
      modalRootId="tags-modal"
    >
      {categorys.map((el) => (
        <div
          key={el.name}
          className="whitespace-nowrap p-1 text-sm text-neutral-600 dark:text-neutral-400 flex items-center"
        >
          <input
            id={el.name}
            type="checkbox"
            defaultChecked={currentCategories.includes(el.name)}
            className="size-4 mr-2 appearance-none rounded fill-neutral-300 dark:fill-neutral-700 text-neutral-900 dark:text-neutral-100 bg-transparent border-neutral-300 dark:border-neutral-700 disabled:!bg-neutral-300 dark:disabled:!bg-neutral-700 disabled:cursor-not-allowed focus:ring-transparent focus:ring-offset-transparent focus:outline-neutral-700 dark:focus:outline-neutral-300 cursor-pointer"
          />{" "}
          <label className=" cursor-pointer w-20" htmlFor={el.name}>
            {el.name}
          </label>
        </div>
      ))}
    </ModalTriggerButton>
  );
};

export default memo(CategoryModalButton);
