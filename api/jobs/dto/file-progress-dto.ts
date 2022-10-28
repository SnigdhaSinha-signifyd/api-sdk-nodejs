import { ContentProgressReportItemDto } from "./content-progress-report-item-dto";
import { ProgressItemDto } from "./progress-item-dto";
import { SummaryReportItemDto } from "./summary-report-item-dto";

interface FileProgressDto {
    contentProgressReport: Array<ContentProgressReportItemDto>;
    progress: ProgressItemDto,
    summaryReport: Array<SummaryReportItemDto>
}

export { FileProgressDto };
