import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PhoneNumberDirective } from "./phone-number.directive";
import { TwoDigitDecimalDirective } from "./two-digit-decimal.directive";

@NgModule({
    declarations: [
        PhoneNumberDirective,
        TwoDigitDecimalDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        PhoneNumberDirective,
        TwoDigitDecimalDirective
    ]
})
export class DirectivesModule {
    
}