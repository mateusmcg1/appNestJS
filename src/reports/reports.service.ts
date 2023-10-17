import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) { }

    async create(reportDto: CreateReportDto, user: User) {
        const report = await this.repo.save(reportDto);
        report.user = user;

        return report;
    }
}
    