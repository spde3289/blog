import ModalTriggerButton from "@/components/ModalTriggerButton";
import type { Category } from "@/types/posts.types";
import { POSTSECTION_TEXT } from "..";

interface CategoryModalButtonProps {
  currentCategories: string[];
  onChange: React.ChangeEventHandler<HTMLDivElement>;
  categorys: Category[];
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
      <div className="flex flex-col gap-1">
        {categorys.map((el) => {
          const isChecked = currentCategories.includes(el.name);
          return (
            <label
              key={el.name}
              htmlFor={el.name}
              className={`group flex w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50 ${
                isChecked
                  ? "typo-14-b text-blue-600 dark:text-blue-400"
                  : "typo-14-m text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <input
                id={el.name}
                type="checkbox"
                defaultChecked={isChecked}
                className="size-4 shrink-0 cursor-pointer rounded border-neutral-300 bg-transparent text-blue-600 accent-blue-600 focus:ring-0 focus:ring-offset-0 dark:border-neutral-700 dark:bg-transparent dark:text-blue-400 dark:accent-blue-400"
              />
              <span className="flex grow items-center">{el.name}</span>
            </label>
          );
        })}
      </div>
    </ModalTriggerButton>
  );
};

export default CategoryModalButton;
