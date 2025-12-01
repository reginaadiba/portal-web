import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Posting } from "./entities/posting.entity";
import { Category } from "../categories/entities/category.entity";
import { Repository } from "typeorm";
import { CreatePostingDto } from "./dto/create-posting.dto";
import { UpdatePostingDto } from "./dto/update-posting.dto";
import { Tag } from "../tags/entities/tag.entity";

@Injectable()
export class PostingsService {
    constructor(
        @InjectRepository(Posting)
        private postingRepo: Repository<Posting>,

        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,

        @InjectRepository(Tag)
        private tagRepo: Repository<Tag>,
    ) { }

    async create(data: CreatePostingDto, image?: Express.Multer.File) {
        // --- PARSE TAGS ---
        let tags = data.tags ?? [];

        if (data.tags) {
            if (typeof data.tags === 'string') {
                // Kalau input string → bisa JSON atau format "news,tech"
                try {
                    tags = JSON.parse(data.tags); // misal '["news","tech"]'
                } catch {
                    tags = data.tags.split(',').map(t => t.trim());
                }
            } else {
                // Kalau sudah array → langsung pakai
                tags = data.tags;
            }
        }

        // --- PROCESS TAG ENTITIES ---
        let tagEntities: Tag[] = [];

        if (tags && Array.isArray(tags)) {
            tagEntities = await Promise.all(
                tags.map(async (name: string) => {
                    let tag = await this.tagRepo.findOne({ where: { name } });
                    if (!tag) {
                        tag = this.tagRepo.create({ name });
                        await this.tagRepo.save(tag);
                    }
                    return tag;
                }),
            );
        }

        // --- CREATE POSTING ---
        const posting = this.postingRepo.create({
            title: data.title,
            content: data.content,
            status: data.status,
            category: { id: Number(data.categoryId) },
            image: image ? image.filename : undefined,
            tags: tagEntities,
        });

        return this.postingRepo.save(posting);
    }

    findAll() {
        return this.postingRepo.find({ relations: ['category', 'tags'] });
    }

    findOne(id: number) {
        return this.postingRepo.findOne({ where: { id }, relations: ['category'] });
    }

    async update(id: number, data: UpdatePostingDto) {
        const posting = await this.postingRepo.findOne({ where: { id }, relations: ['tags'] });

        if (!posting) throw new NotFoundException('Posting not found');

        let tags = data.tags ?? [];

        if (data.tags) {
            if (typeof data.tags === 'string') {
                // Kalau input string → bisa JSON atau format "news,tech"
                try {
                    tags = JSON.parse(data.tags); // misal '["news","tech"]'
                } catch {
                    tags = data.tags.split(',').map(t => t.trim());
                }
            } else {
                // Kalau sudah array → langsung pakai
                tags = data.tags;
            }
        }

        // --- PROCESS TAG ENTITIES ---
        if (Array.isArray(tags)) {
            posting.tags = await Promise.all(
                tags.map(async (name: string) => {
                    let tag = await this.tagRepo.findOne({ where: { name } });
                    if (!tag) {
                        tag = this.tagRepo.create({ name });
                        await this.tagRepo.save(tag);
                    }
                    return tag;
                }),
            );
        }

        // Update field lain
        posting.title = data.title ?? posting.title;
        posting.content = data.content ?? posting.content;
        posting.status = data.status ?? posting.status;
        posting.category = data.categoryId 
            ? { id: Number(data.categoryId) } as any
            : posting.category;
        if (data.image) {
            posting.image = data.image ?? posting.image;
        }

        return this.postingRepo.save(posting);
    }

    remove(id: number) {
        return this.postingRepo.delete(id);
    }
}
