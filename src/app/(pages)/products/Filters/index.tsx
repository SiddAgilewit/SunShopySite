'use client';

import React from 'react';
import { Category } from '../../../../payload/payload-types';
import { Checkbox } from '../../../_components/Checkbox';
import { HR } from '../../../_components/HR';
import { RadioButton } from '../../../_components/Radio';
import { useFilter } from '../../../_providers/Filter';
import classes from './index.module.scss';

const Filters = ({ categories }: { categories: Category[] | null | undefined }) => {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter();

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId);
      setCategoryFilters(updatedCategories);
    } else {
      setCategoryFilters([...categoryFilters, categoryId]);
    }
  };

  const handleSort = (value: string) => setSort(value);

  // Safely map over categories
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className={classes.filters}>
      <div>
<<<<<<< HEAD
        <h6 className={classes.title}>Categories</h6>
=======
<<<<<<< HEAD
        <h6 className={classes.title}>Product Categories</h6>
=======
        <h6 className={classes.title}>Categorie</h6>
>>>>>>> f694812d1cf77280724c8ace66d05f5793e77371
>>>>>>> d9a42461e46a82d1b064ec07ff75d20483891484
        <div className={classes.categories}>
          {safeCategories.length > 0 ? (
            safeCategories.map(category => {
              const isSelected = categoryFilters.includes(category.id);

              return (
                <Checkbox
                  key={category.id}
                  label={category.title}
                  value={category.id}
                  isSelected={isSelected}
                  onClickHandler={handleCategories}
                />
              );
            })
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
