import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,
    ) { }

    async create(data: CreateCategoryDto) {
        const posting = this.categoryRepo.create({
            ...data,
        });

        return this.categoryRepo.save(posting);
    }

    findAll() {
        return this.categoryRepo.find();
    }

    findOne(id: number) {
        return this.categoryRepo.findOne({ where: { id }});
    }

    update(id: number, data: UpdateCategoryDto) {
        return this.categoryRepo.update(id, data);
    }

    remove(id: number) {
        return this.categoryRepo.delete(id);
    }
}
