import { handlerWrapper } from '../../lib/utils/handlerWrapper';
import { LambdaLogic } from '../../lib/types/AWS';
import { createCategorySchema, updateCategorySchema, deleteCategorySchema } from './validators';
import { Category, ICategory } from "../../lib/models";
import { HttpError } from '../../lib/utils';
const create: LambdaLogic = async event => {
    let category: ICategory = new Category(event.body);
    return await category.save();
}
const update: LambdaLogic<{}, {}, PathParam> = async event => {
    const { body } = event;
    const category = await Category.findOneAndUpdate({ _id: event.pathParameters.id }, { ...body }, { new: true, lean: true });
    if (!category) throw new HttpError().BadRequest();
    return category;
}
const deleteC: LambdaLogic<{}, {}, PathParam> = async event => {
    const category = await Category.findOneAndRemove({ _id: event.pathParameters.id }, { select: "_id name" });
    if (!category) throw new HttpError().BadRequest();
    return category;
}
const get: LambdaLogic = async event => {
    const categories = await Category.find({}, { name: 1, deleted:1, image:1 }, { lean: true });
    return categories;
}

type PathParam = {
    id: string
}
export const createCategory = handlerWrapper(create, createCategorySchema);
export const updateCategory = handlerWrapper<{}, {}, PathParam>(update, updateCategorySchema);
export const deleteCategory = handlerWrapper<{}, {}, PathParam>(deleteC, deleteCategorySchema);
export const getCategory = handlerWrapper(get);