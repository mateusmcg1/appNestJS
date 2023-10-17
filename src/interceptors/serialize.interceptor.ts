import { CallHandler, ExecutionContext, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { ReportDto } from "src/reports/dtos/report.dto";
import { UserDto } from "src/users/dtos/user.dto";

interface ClassConstructor{
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor{
    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
               return plainToClass(ReportDto, data,{
                excludeExtraneousValues: true,
               });
            }),
        )
    }
}