import React, { useState } from 'react';
import './treeView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleXmark,
  faCircleCheck,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  name: string;
  subcategories: Category[];
  isEditing: boolean;
}

interface CategoryNode extends Category {
  isEditing: boolean;
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Food',
    subcategories: [
      {
        id: '1.1',
        name: 'Fish',
        subcategories: [
          {
            id: '1.1.1',
            name: 'Mudusa',
            subcategories: [],
            isEditing: false,
          },
        ],
        isEditing: false,
      },
    ],
    isEditing: false,
  },
  {
    id: '2',
    name: 'Cars',
    subcategories: [
      {
        id: '2.1',
        name: 'BMW',
        subcategories: [],
        isEditing: false,
      },
      {
        id: '2.2',
        name: 'Mercedes',
        subcategories: [],
        isEditing: false,
      },
    ],
    isEditing: false,
  },
];

const TreeView: React.FC = () => {
  const [categories, setCategories] =
    useState<CategoryNode[]>(initialCategories);

  const handleCreateCategory = (parentId: string | null) => {
    setCategories((prevCategories) => {
      const newCategory: CategoryNode = {
        id: new Date().toString(),
        name: '',
        subcategories: [],
        isEditing: true,
      };

      if (parentId === null) {
        return [...prevCategories, newCategory];
      }

      const updateCategory = (categories: CategoryNode[]): CategoryNode[] => {
        return categories.map((category) => {
          if (category.id === parentId) {
            return {
              ...category,
              subcategories: [...category.subcategories, newCategory],
            };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleRenameCategory = (categoryId: string) => {
    setCategories((prevCategories) => {
      const updateCategory = (categories: Category[]): Category[] => {
        return categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, isEditing: true };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    const { value } = event.target;

    const updateCategory = (category: CategoryNode): CategoryNode => {
      if (category.id === categoryId) {
        return { ...category, name: value };
      } else if (category.subcategories.length > 0) {
        return {
          ...category,
          subcategories: category.subcategories.map((subCategory) =>
            updateCategory(subCategory)
          ),
        };
      }
      return category;
    };

    setCategories((prevCategories) => {
      return prevCategories.map((category) => updateCategory(category));
    });
  };

  const handleSaveCategory = (categoryId: string) => {
    setCategories((prevCategories) => {
      const updateCategory = (categories: CategoryNode[]): CategoryNode[] => {
        return categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, isEditing: false };
          } else if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: updateCategory(category.subcategories),
            };
          }
          return category;
        });
      };

      return updateCategory(prevCategories);
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prevCategories) => {
      const removeCategory = (categories: CategoryNode[]): CategoryNode[] => {
        return categories.filter((category) => {
          if (category.id === categoryId) {
            return false;
          } else if (category.subcategories.length > 0) {
            category.subcategories = removeCategory(category.subcategories);
          }
          return true;
        });
      };

      return removeCategory(prevCategories);
    });
  };

  const renderCategory = (category: Category | CategoryNode) => {
    return (
      <div key={category.id} className="category-list-elem">
        <div className="category">
          {'isEditing' in category && category.isEditing ? (
            <>
              <input
                type="text"
                value={category.name}
                onChange={(event) => handleInputChange(event, category.id)}
              />
              <div
                className="control-element button"
                onClick={() => handleSaveCategory(category.id)}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
            </>
          ) : (
            <>
              {category.name}
              <div
                className="control-element button"
                onClick={() => handleCreateCategory(category.id)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
              <div
                className="control-element button"
                onClick={() => handleRenameCategory(category.id)}
              >
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div
                className="control-element button"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
            </>
          )}
        </div>
        {category.subcategories.length > 0 && (
          <>
            <div className="line"></div>
            <div className="categories">
              {category.subcategories.map((subCategory) =>
                renderCategory(subCategory)
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="category">
        <h2>Categories</h2>
        <div
          className="control-element button"
          onClick={() => handleCreateCategory(null)}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </div>
      </div>
      <div className="categories">
        {categories.map((category) => renderCategory(category))}
      </div>
    </>
  );
};

export default TreeView;
