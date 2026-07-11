"use strict";
(self["webpackChunkedu_UI"] = self["webpackChunkedu_UI"] || []).push([["src_app_userrole_admin_exam-reports_exam-reports_module_ts"],{

/***/ 6654:
/*!***********************************************************************!*\
  !*** ./src/app/userrole/admin/exam-reports/exam-reports.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExamReportsComponent: () => (/* binding */ ExamReportsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 3037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/api.config */ 1892);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/portal */ 9168);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var src_app_shared_services_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/loader.service */ 3657);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/overlay */ 1570);
/* harmony import */ var src_app_shared_services_page_meta_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/page-meta.service */ 3413);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var src_app_shared_services_confirm_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/services/confirm.service */ 5302);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ 4646);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/tabs */ 8223);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/autocomplete */ 9771);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/datepicker */ 1977);


























const _c0 = ["filtersBtn"];
const _c1 = ["filtersPanel"];
function ExamReportsComponent_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const inst_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", inst_r38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](inst_r38.name);
  }
}
function ExamReportsComponent_mat_option_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72)(1, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const exam_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", exam_r39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](exam_r39.title || exam_r39.name);
  }
}
function ExamReportsComponent_ng_template_31_mat_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", c_r47.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", c_r47.name, " ");
  }
}
function ExamReportsComponent_ng_template_31_mat_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", c_r48.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", c_r48.name, " ");
  }
}
function ExamReportsComponent_ng_template_31_mat_option_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cp_r49 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", cp_r49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", cp_r49, " ");
  }
}
function ExamReportsComponent_ng_template_31_mat_option_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const d_r50 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", d_r50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", d_r50, " ");
  }
}
function ExamReportsComponent_ng_template_31_mat_option_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", t_r51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", t_r51, " ");
  }
}
function ExamReportsComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_ng_template_31_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 75)(2, "h4")(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "tune");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Filters");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 76)(7, "mat-form-field", 77)(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Country");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-select", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_mat_select_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r53.userFilters.country_id = $event);
    })("selectionChange", function ExamReportsComponent_ng_template_31_Template_mat_select_selectionChange_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r55.onCountryChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "mat-option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ExamReportsComponent_ng_template_31_mat_option_13_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-form-field", 77)(15, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "City");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "mat-select", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_mat_select_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r56.userFilters.city_id = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "mat-option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, ExamReportsComponent_ng_template_31_mat_option_20_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "mat-form-field", 77)(22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Campus");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "mat-select", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_mat_select_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r57.userFilters.campus_id = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "mat-option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, ExamReportsComponent_ng_template_31_mat_option_27_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "mat-form-field", 77)(29, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "mat-select", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_mat_select_ngModelChange_31_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r58.userFilters.department_id = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "mat-option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, ExamReportsComponent_ng_template_31_mat_option_34_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "mat-form-field", 77)(36, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Team");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "mat-select", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_mat_select_ngModelChange_38_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r59.userFilters.teams_id = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "mat-option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](41, ExamReportsComponent_ng_template_31_mat_option_41_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "mat-form-field", 77)(43, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "Test schedule after");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_input_ngModelChange_45_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r60.userFilters.joined_after = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](46, "mat-datepicker-toggle", 85)(47, "mat-datepicker", null, 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "mat-form-field", 77)(50, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](51, "Test schedule before");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "input", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_ng_template_31_Template_input_ngModelChange_52_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r61.userFilters.joined_before = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](53, "mat-datepicker-toggle", 85)(54, "mat-datepicker", null, 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "div", 89)(57, "button", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_ng_template_31_Template_button_click_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      ctx_r62.loadScheduledTest();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r62.closeFiltersOverlay());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](58, "mat-icon", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, " Apply ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_ng_template_31_Template_button_click_60_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r54);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r63.resetFiltersAndReload());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](61, "mat-icon", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](62, " Reset ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](48);
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](55);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r6.userFilters.country_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.countries);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r6.userFilters.city_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.cities);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r6.userFilters.campus_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.campusList);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r6.userFilters.department_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.departmentList);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r6.userFilters.teams_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r6.teamList);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matDatepicker", _r45)("ngModel", ctx_r6.userFilters.joined_after);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matDatepicker", _r46)("ngModel", ctx_r6.userFilters.joined_before);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", _r46);
  }
}
function ExamReportsComponent_div_102_th_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Student");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_102_td_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r78 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 102)(1, "div", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_102_td_4_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r78);
      const row_r76 = restoredCtx.$implicit;
      const ctx_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r77.openUserReview(row_r76));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r76 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((row_r76.student_name || row_r76.name || "S").charAt(0).toUpperCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r76.student_name || row_r76.name || "Student");
  }
}
function ExamReportsComponent_div_102_th_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Marks / Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_102_td_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106)(1, "span", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "/");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r79 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", row_r79.marks_obtained, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", row_r79.total_marks, "");
  }
}
function ExamReportsComponent_div_102_th_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Percentage");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_102_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106)(1, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r80 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r80.percentage);
  }
}
function ExamReportsComponent_div_102_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Manual Review");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_102_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106)(1, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r81 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("review-pending", row_r81.manual_review === "pending" || row_r81.manual_review === "Pending");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r81.manual_review);
  }
}
function ExamReportsComponent_div_102_th_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Result");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_102_td_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106)(1, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r82 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("result-pass", (row_r82.result || "").toLowerCase() === "pass" || (row_r82.result || "").toLowerCase() === "passed")("result-fail", (row_r82.result || "").toLowerCase() === "fail" || (row_r82.result || "").toLowerCase() === "failed");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r82.result);
  }
}
function ExamReportsComponent_div_102_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 112);
  }
}
function ExamReportsComponent_div_102_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 113);
  }
}
const _c2 = function () {
  return ["student_name", "questions_attempted", "correct_answers", "wrong_answers", "result"];
};
function ExamReportsComponent_div_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r85 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 53)(1, "table", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](2, 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_102_th_3_Template, 2, 0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_102_td_4_Template, 6, 2, "td", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](5, 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ExamReportsComponent_div_102_th_6_Template, 2, 0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_102_td_7_Template, 6, 2, "td", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](8, 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ExamReportsComponent_div_102_th_9_Template, 2, 0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, ExamReportsComponent_div_102_td_10_Template, 3, 1, "td", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](11, 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, ExamReportsComponent_div_102_th_12_Template, 2, 0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ExamReportsComponent_div_102_td_13_Template, 3, 3, "td", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](14, 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ExamReportsComponent_div_102_th_15_Template, 2, 0, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ExamReportsComponent_div_102_td_16_Template, 3, 5, "td", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ExamReportsComponent_div_102_tr_17_Template, 1, 0, "tr", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, ExamReportsComponent_div_102_tr_18_Template, 1, 0, "tr", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 99)(20, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_102_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r85);
      const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r84.prevPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Prev");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_102_Template_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r85);
      const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r86.nextPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Next");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx_r7.userReportData);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](8, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r7.currentPage <= 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Page ", ctx_r7.currentPage, " of ", ctx_r7.totalPages, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r7.currentPage >= ctx_r7.totalPages);
  }
}
function ExamReportsComponent_div_103_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Loading user report...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_th_157_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Question Bank");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_158_Template(rf, ctx) {
  if (rf & 1) {
    const _r89 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 102)(1, "div", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_td_158_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r89);
      const c_r87 = restoredCtx.$implicit;
      const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r88.openCategoryQuestionSummary(c_r87));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const c_r87 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((c_r87.category_name || c_r87.name || "?").charAt(0).toUpperCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r87.category_name || c_r87.name);
  }
}
function ExamReportsComponent_th_160_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Questions");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_161_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r90 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r90.total_questions || c_r90.questions_count);
  }
}
function ExamReportsComponent_th_163_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Users Attempted");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_164_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r91 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r91.no_of_students || c_r91.users_attempted);
  }
}
function ExamReportsComponent_th_166_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Total Attempts");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_167_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r92 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r92.total_attempts);
  }
}
function ExamReportsComponent_th_169_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Mistakes");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_170_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r93 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r93.wrong_answers || c_r93.mistakes || c_r93.wrong_count);
  }
}
function ExamReportsComponent_th_172_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Error %");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_173_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r94 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](c_r94.error_percentage || c_r94.error_pct);
  }
}
function ExamReportsComponent_tr_174_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 112);
  }
}
function ExamReportsComponent_tr_175_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 113);
  }
}
function ExamReportsComponent_th_181_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "#");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_182_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r96 = ctx.$implicit;
    const i_r97 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", q_r96.sno || i_r97 + 1, " ");
  }
}
function ExamReportsComponent_th_184_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Question");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_185_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r98 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", q_r98.question_text || q_r98.text, " ");
  }
}
function ExamReportsComponent_th_187_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Users Attempted");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_188_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r99 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r99.user_attempts);
  }
}
function ExamReportsComponent_th_190_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Attempts");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_191_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r100 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r100.attempts);
  }
}
function ExamReportsComponent_th_193_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Mistakes");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_td_194_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_td_194_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r105);
      const q_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r103.openWrongAnswerSummary(q_r101));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r101.mistakes);
  }
}
function ExamReportsComponent_td_194_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_td_194_a_1_Template, 2, 1, "a", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r101 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r101.mistakes || 0) > 0);
  }
}
function ExamReportsComponent_tr_195_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 112);
  }
}
function ExamReportsComponent_tr_196_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 113);
  }
}
function ExamReportsComponent_div_197_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Loading review...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate3"]("", q_r116.marks_awarded, "/", q_r116.question_marks, " Marks(", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 3, q_r116.marks_awarded / (q_r116.question_marks || 1) * 100, "1.2-2"), "%)");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "mat-icon", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate3"](" ", q_r116.marks_awarded, "/", q_r116.question_marks, " Marks(", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 4, q_r116.marks_awarded / (q_r116.question_marks || 1) * 100, "1.2-2"), "%) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", "AI Confidence: " + (q_r116.ai_confidence != null ? q_r116.ai_confidence + "%" : "N/A"), " ");
  }
}
const _c3 = function (a0, a1, a2) {
  return {
    "mark-positive": a0,
    "mark-negative": a1,
    "mark-mid": a2
  };
};
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r131 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 159)(1, "div", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_1_Template_button_click_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r131);
      const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r129.startEditMarks(q_r116));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction3"](2, _c3, (q_r116.marks_awarded || 0) == (q_r116.question_marks || 0), (q_r116.marks_awarded || 0) == 0, (q_r116.marks_awarded || 0) > 0 && (q_r116.marks_awarded || 0) < (q_r116.question_marks || 0)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.marks_awarded != null ? q_r116.marks_awarded + " / " + (q_r116.question_marks || "-") : q_r116.marks ? "0 / " + q_r116.marks : "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r135 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 162)(1, "input", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_2_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r135);
      const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](q_r116._editedMarks = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "span", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_2_Template_button_click_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r135);
      const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r136 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r136.saveMarks(q_r116));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "check");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_2_Template_button_click_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r135);
      const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r138 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r138.cancelEditMarks(q_r116));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", q_r116._editedMarks)("min", 0)("max", q_r116.question_marks || 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("/ ", q_r116.question_marks || "-", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_1_Template, 6, 6, "div", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_div_2_Template, 10, 4, "div", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !q_r116._editingMarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116._editingMarks);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction3"](2, _c3, (q_r116.marks_awarded || 0) == (q_r116.question_marks || 0), (q_r116.marks_awarded || 0) == 0, (q_r116.marks_awarded || 0) > 0 && (q_r116.marks_awarded || 0) < (q_r116.question_marks || 0)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.marks_awarded != null ? q_r116.marks_awarded + " / " + (q_r116.question_marks || "-") : q_r116.marks ? "0 / " + q_r116.marks : "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_17_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 171);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Correct Answer: ", q_r116.options[0].option_text || q_r116.options[0], "");
  }
}
const _c4 = function () {
  return [];
};
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 167)(1, "div", 168)(2, "div", 169);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_17_div_4_Template, 2, 1, "div", 170);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](6, _c4)).length)("correct", q_r116.is_correct);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Student Answer: ", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c4)).join(", ") || "-", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.marks_awarded === 0);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 182)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "High-level Feedback");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 183);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.feedback);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 203)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r169 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    const rc_r153 = ctx_r169.$implicit;
    const rci_r154 = ctx_r169.index;
    const ctx_r164 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r153.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r154 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r162.is_deleted == 1 || h_r162.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r164.toTitleCase(h_r162.comment_text || h_r162.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r173 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 207)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_3_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r173);
      const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](h_r162._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const rci_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r154 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", h_r162._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", h_r162.updated_by || h_r162.created_by || h_r162.reviewer_id || "System", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Edited by ", h_r162.updated_by || h_r162.created_by, " On ", h_r162.updated_date, " ");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r184 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r184);
      const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r182 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r182.startEditComment(h_r162));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r187 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r187);
      const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r185 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r185.confirmDeleteComment(h_r162));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r190 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r190);
      const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r188 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r188.saveReviewComment(h_r162));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r193 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r193);
      const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r191 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r191.cancelEditComment(h_r162));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r162 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r162._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r162._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r162._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r162._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 202);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_2_Template, 6, 6, "div", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_3_Template, 5, 2, "div", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_span_5_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_span_6_Template, 2, 2, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_div_7_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r162 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r162.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r162._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r162._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r162.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r162.is_deleted != 1 && (h_r162.updated_by || h_r162.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r162.updated_by);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 201);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_div_1_Template, 8, 7, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", rc_r153.history);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 203)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r196 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rc_r153 = ctx_r196.$implicit;
    const rci_r154 = ctx_r196.index;
    const ctx_r156 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r153.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r154 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r153.is_deleted == 1 || rc_r153.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r156.toTitleCase(rc_r153.comment_text || rc_r153.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r199 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 207)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_5_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r199);
      const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](rc_r153._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r200 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rci_r154 = ctx_r200.index;
    const rc_r153 = ctx_r200.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r154 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", rc_r153._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", rc_r153.updated_by || rc_r153.created_by || rc_r153.reviewer_id || "System", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Edited by ", rc_r153.updated_by || rc_r153.created_by, " On ", rc_r153.updated_date, " ");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r209 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r209);
      const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r207 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r207.startEditComment(rc_r153));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r212 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r212);
      const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r210 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r210.confirmDeleteComment(rc_r153));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r215 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r215);
      const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r213 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r213.saveReviewComment(rc_r153));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r218 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r218);
      const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r216 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r216.cancelEditComment(rc_r153));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r153 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r153._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r153._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 193)(2, "div", 194);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_3_Template, 2, 1, "div", 195);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_4_Template, 6, 6, "div", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_5_Template, 5, 2, "div", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_span_7_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_span_8_Template, 2, 2, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_div_9_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const rc_r153 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153.history && rc_r153.history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r153._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r153.is_deleted != 1 && (rc_r153.updated_by || rc_r153.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r153.updated_by);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 203)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r236 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const h_r229 = ctx_r236.$implicit;
    const hi_r230 = ctx_r236.index;
    const ctx_r231 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r229.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](hi_r230 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r229.is_deleted == 1 || h_r229.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r231.toTitleCase(h_r229.comment_text || h_r229.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r239 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 207)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_3_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r239);
      const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](h_r229._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const rci_r221 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r221 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", h_r229._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", h_r229.updated_by || h_r229.created_by || h_r229.reviewer_id || "System", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Edited by ", h_r229.updated_by || h_r229.created_by, " On ", h_r229.updated_date, " ");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r250 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r250);
      const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r248 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r248.startEditComment(h_r229));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r253 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r253);
      const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r251 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r251.confirmDeleteComment(h_r229));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r256 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r256);
      const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r254 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r254.saveReviewComment(h_r229));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r259 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r259);
      const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r257 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r257.cancelEditComment(h_r229));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r229._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r229._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r229._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r229._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 202);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_2_Template, 6, 6, "div", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_3_Template, 5, 2, "div", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_span_5_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_span_6_Template, 2, 2, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_div_7_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r229 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r229.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r229._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r229._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r229.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r229.is_deleted != 1 && (h_r229.updated_by || h_r229.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r229.updated_by);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 201);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_div_1_Template, 8, 7, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", rc_r220.history);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 221)(1, "div", 204)(2, "span", 222);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r262 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rc_r220 = ctx_r262.$implicit;
    const rci_r221 = ctx_r262.index;
    const ctx_r223 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r220.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r221 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r220.is_deleted == 1 || rc_r220.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r223.toTitleCase(rc_r220.comment_text || rc_r220.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r265 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 223)(1, "div", 204)(2, "span", 222);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_5_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r265);
      const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](rc_r220._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r266 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rci_r221 = ctx_r266.index;
    const rc_r220 = ctx_r266.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r221 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", rc_r220._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", rc_r220.updated_by || rc_r220.reviewer_id || rc_r220.commented_by || "Instructor", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Edited by ", rc_r220.updated_by || rc_r220.edited_by, "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r275 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r275);
      const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r273 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r273.startEditComment(rc_r220));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r278 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r278);
      const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r276 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r276.confirmDeleteComment(rc_r220));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r281 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r281);
      const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r279 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r279.saveReviewComment(rc_r220));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r284 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r284);
      const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r282 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r282.cancelEditComment(rc_r220));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r220._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r220._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 193)(2, "div", 194);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_3_Template, 2, 1, "div", 195);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_4_Template, 6, 6, "div", 219);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_5_Template, 5, 2, "div", 220);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_span_7_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_span_8_Template, 2, 1, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_div_9_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const rc_r220 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220.history && rc_r220.history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r220._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r220.is_deleted != 1 && (rc_r220.updated_by || rc_r220.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r220.updated_by);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 203)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r302 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const h_r295 = ctx_r302.$implicit;
    const hi_r296 = ctx_r302.index;
    const ctx_r297 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r295.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](hi_r296 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r295.is_deleted == 1 || h_r295.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r297.toTitleCase(h_r295.comment_text || h_r295.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r305 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 207)(1, "div", 204)(2, "span", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_3_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r305);
      const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](h_r295._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const rci_r287 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r287 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", h_r295._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", h_r295.updated_by || h_r295.created_by || h_r295.reviewer_id || "System", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Edited by ", h_r295.updated_by || h_r295.created_by, " On ", h_r295.updated_date, " ");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r316 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r316);
      const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r314 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r314.startEditComment(h_r295));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r319 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r319);
      const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r317 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r317.confirmDeleteComment(h_r295));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r322 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r322);
      const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r320 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r320.saveReviewComment(h_r295));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r325 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r325);
      const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r323 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](10);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r323.cancelEditComment(h_r295));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const h_r295 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r295._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r295._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r295._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r295._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 202);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_2_Template, 6, 6, "div", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_3_Template, 5, 2, "div", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_span_5_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_span_6_Template, 2, 2, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_div_7_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r295 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", h_r295.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r295._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r295._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r295.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", h_r295.is_deleted != 1 && (h_r295.updated_by || h_r295.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !h_r295.updated_by);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 201);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_div_1_Template, 8, 7, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", rc_r286.history);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 226)(1, "div", 204)(2, "span", 227);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r328 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rc_r286 = ctx_r328.$implicit;
    const rci_r287 = ctx_r328.index;
    const ctx_r289 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r286.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r287 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("deleted", rc_r286.is_deleted == 1 || rc_r286.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r289.toTitleCase(rc_r286.comment_text || rc_r286.comment || ""));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r331 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 228)(1, "div", 204)(2, "span", 227);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "textarea", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_5_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r331);
      const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](rc_r286._editedText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r332 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const rci_r287 = ctx_r332.index;
    const rc_r286 = ctx_r332.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rci_r287 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", rc_r286._editedText);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Deleted by ", rc_r286.updated_by || rc_r286.reviewer_id || rc_r286.commented_by || "Instructor", "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Edited by ", rc_r286.updated_by || rc_r286.edited_by, "");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r341 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r341);
      const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r339 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r339.startEditComment(rc_r286));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r344 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_2_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r344);
      const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r342 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r342.confirmDeleteComment(rc_r286));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r347 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_3_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r347);
      const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r345 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r345.saveReviewComment(rc_r286));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r350 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_4_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r350);
      const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
      const ctx_r348 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](8);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r348.cancelEditComment(rc_r286));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_1_Template, 4, 0, "a", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_2_Template, 4, 0, "a", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_3_Template, 4, 0, "a", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_a_4_Template, 4, 0, "a", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rc_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r286._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r286._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286._editing);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 193)(2, "div", 194);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_3_Template, 2, 1, "div", 195);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_4_Template, 6, 6, "div", 224);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_5_Template, 5, 2, "div", 225);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_span_7_Template, 2, 1, "span", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_span_8_Template, 2, 1, "span", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_div_9_Template, 5, 4, "div", 200);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const rc_r286 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286.history && rc_r286.history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r286._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286._editing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286.is_deleted == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", rc_r286.is_deleted != 1 && (rc_r286.updated_by || rc_r286.edited_by));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !rc_r286.updated_by);
  }
}
const _c5 = function () {
  return ["incorrct", "incorrect", "incor"];
};
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 184)(1, "div", 185)(2, "div", 186)(3, "div", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "span", 188);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Points Missed");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_7_Template, 10, 6, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 189)(9, "div", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "span", 190);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Points Incorrect");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_13_Template, 10, 6, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 191)(15, "div", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "span", 192);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Points Incomplete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_div_19_Template, 10, 6, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    const ctx_r147 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r147.reviewComments(q_r116, "missing"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r147.reviewComments(q_r116, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](3, _c5)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r147.reviewComments(q_r116, "incomplete"));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 246);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 234)(1, "div", 235);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "div", 236);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_7_div_3_Template, 1, 0, "div", 237);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 238)(5, "div", 239)(6, "div", 240);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Current");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 241);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span", 242);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 243)(13, "span", 244)(14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "person");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "span", 245)(18, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.marks_history && q_r116.marks_history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", q_r116.marks_awarded, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("/ ", q_r116.question_marks || "-", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.updated_date);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_8_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 246);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 247)(1, "div", 235);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "div", 248);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_8_div_3_Template, 1, 0, "div", 237);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 238)(5, "div", 249)(6, "div", 241);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span", 242);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 243)(11, "span", 244)(12, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "person");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "span", 245)(16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const mh_r357 = ctx.$implicit;
    const isLast_r359 = ctx.last;
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !isLast_r359);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", mh_r357.marks_awarded, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("/ ", q_r116.question_marks || "-", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](mh_r357.updated_by || "System");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](mh_r357.updated_date);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 229)(1, "div", 230)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "history");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Marks History");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 231);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_7_Template, 21, 5, "div", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_div_8_Template, 19, 5, "div", 233);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.updated_by);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", q_r116.marks_history);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 172);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_1_Template, 5, 1, "div", 173);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_2_Template, 20, 4, "div", 174);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 175)(4, "div", 176);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Student's Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 177);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 178)(9, "div", 179);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Model Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 180);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_div_13_Template, 9, 2, "div", 181);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.feedback);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.review_comment && q_r116.review_comment.comments && q_r116.review_comment.comments.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](5, _c4)).join(" ") || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.correct_option || q_r116.options && q_r116.options[0] && q_r116.options[0].option_text || q_r116.correct_answer || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.marks_history && q_r116.marks_history.length);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 262);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Student Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 263);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Correct Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 264);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Correct Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 258);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_1_Template, 2, 0, "span", 259);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_2_Template, 2, 0, "span", 260);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_span_3_Template, 2, 0, "span", 261);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const opt_r365 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](3, _c4)).indexOf(opt_r365.option_text || opt_r365) !== -1 && !(opt_r365.is_correct == 1 || opt_r365.is_correct === true));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c4)).indexOf(opt_r365.option_text || opt_r365) !== -1 && (opt_r365.is_correct == 1 || opt_r365.is_correct === true));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", opt_r365.is_correct && (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](5, _c4)).indexOf(opt_r365.option_text || opt_r365) === -1);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 263);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Correct Option");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 262);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Student Selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 264);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Missed Correct Option");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 258);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_1_Template, 2, 0, "span", 260);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_2_Template, 2, 0, "span", 259);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_span_3_Template, 2, 0, "span", 261);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const opt_r365 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](3, _c4)).indexOf(opt_r365.option_text || opt_r365) !== -1 && (opt_r365.is_correct == 1 || opt_r365.is_correct === true));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c4)).indexOf(opt_r365.option_text || opt_r365) !== -1 && !(opt_r365.is_correct == 1 || opt_r365.is_correct === true));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", opt_r365.is_correct && (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](5, _c4)).indexOf(opt_r365.option_text || opt_r365) === -1);
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 252)(1, "div", 253)(2, "span", 254);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 255)(5, "div", 256);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_7_Template, 4, 6, "div", 257);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_div_8_Template, 4, 6, "div", 257);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const opt_r365 = ctx.$implicit;
    const oi_r366 = ctx.index;
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).$implicit;
    const ctx_r364 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("correct", opt_r365.is_correct == 1 || opt_r365.is_correct === true)("selected", (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](10, _c4)).indexOf(opt_r365.option_text || opt_r365) !== -1)("missed", opt_r365.is_correct && (q_r116.selected_option || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](11, _c4)).indexOf(opt_r365.option_text || opt_r365) === -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r364.getOptionLetter(oi_r366));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](opt_r365.option_text || opt_r365);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.question_type == "choose");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.question_type == "multi");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_div_1_Template, 9, 12, "div", 251);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", q_r116.options || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c4));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 139)(1, "div", 140)(2, "div", 141)(3, "div", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 143)(6, "div", 144)(7, "div", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_9_Template, 3, 6, "div", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_10_Template, 5, 7, "div", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 147)(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_15_Template, 3, 2, "div", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_16_Template, 2, 6, "div", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_17_Template, 5, 8, "div", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_18_Template, 14, 6, "div", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_div_19_Template, 2, 2, "div", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r116 = ctx.$implicit;
    const qi_r117 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.sno || q_r116.qno ? q_r116.sno || q_r116.qno : qi_r117 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((q_r116.question_type || q_r116.type || "").toUpperCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.question_type != "descriptive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", q_r116.question_type === "descriptive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](q_r116.question_text || q_r116.text || q_r116.title || "Question");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.question_type || q_r116.type) === "descriptive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.question_type || q_r116.type) !== "descriptive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.question_type || q_r116.type) === "fill");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.question_type || q_r116.type) === "descriptive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (q_r116.question_type || q_r116.type) == "choose" || (q_r116.question_type || q_r116.type) == "multi");
  }
}
function ExamReportsComponent_div_197_div_20_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_div_1_div_1_div_2_Template, 20, 10, "div", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const att_r114 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", att_r114.review || att_r114.questions || _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c4));
  }
}
function ExamReportsComponent_div_197_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_div_1_Template, 3, 2, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r110.userReviewAttempts);
  }
}
function ExamReportsComponent_div_197_div_20_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No review data available for this user.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_197_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ExamReportsComponent_div_197_div_20_div_1_Template, 2, 1, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_197_div_20_ng_template_2_Template, 2, 0, "ng-template", null, 135, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r111 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](3);
    const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r109.userReviewAttempts && ctx_r109.userReviewAttempts.length)("ngIfElse", _r111);
  }
}
const _c6 = function (a0, a1) {
  return {
    "pass": a0,
    "fail": a1
  };
};
function ExamReportsComponent_div_197_Template(rf, ctx) {
  if (rf & 1) {
    const _r382 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r382);
      const ctx_r381 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r381.closeUserReview());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 121)(3, "div", 122)(4, "div", 123)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "assignment");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 124)(8, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "h3")(11, "span", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "span", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r382);
      const ctx_r384 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r384.closeUserReview());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, ExamReportsComponent_div_197_div_19_Template, 2, 0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, ExamReportsComponent_div_197_div_20_Template, 4, 2, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 131)(22, "button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_197_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r382);
      const ctx_r385 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r385.closeUserReview());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Answer Sheet - ", ctx_r35.selectedUserName || "User", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("Score: ", ctx_r35.selectedUserScore || "-", " / ", ctx_r35.totalMarks || "-", " \u00A0|\u00A0Result: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](7, _c6, (ctx_r35.selectedUserResult || "").toLowerCase() === "pass", (ctx_r35.selectedUserResult || "").toLowerCase() === "fail"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r35.selectedUserResult || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r35.userReviewLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r35.userReviewLoading);
  }
}
function ExamReportsComponent_div_198_div_17_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r391 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td", 270)(2, "a", 271);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_div_17_tr_13_Template_a_click_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r391);
      const wa_r389 = restoredCtx.$implicit;
      const ctx_r390 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r390.openResourcesForWrongAnswer(ctx_r390.selectedQuestionForWrongSummary, wa_r389));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "td", 272)(5, "a", 273);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_div_17_tr_13_Template_a_click_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r391);
      const wa_r389 = restoredCtx.$implicit;
      const ctx_r392 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r392.openResourcesForWrongAnswer(ctx_r392.selectedQuestionForWrongSummary, wa_r389));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "td", 274);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const wa_r389 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](wa_r389.answer);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](wa_r389.count || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](wa_r389.pct || "-");
  }
}
function ExamReportsComponent_div_198_div_17_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No wrong answer data available for this question.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_198_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r394 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 268);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "table", 269)(4, "thead")(5, "tr")(6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Wrong Answers");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "No. of times selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Occurrence %");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ExamReportsComponent_div_198_div_17_tr_13_Template, 9, 3, "tr", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, ExamReportsComponent_div_198_div_17_div_14_Template, 2, 0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 131)(16, "button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_div_17_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r394);
      const ctx_r393 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r393.closeWrongAnswerSummary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r386 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Question: ", ctx_r386.selectedQuestionForWrongSummary.question_text || ctx_r386.selectedQuestionForWrongSummary.text || ctx_r386.selectedQuestionForWrongSummary.name || "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r386.selectedWrongAnswers);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r386.selectedWrongAnswers || !ctx_r386.selectedWrongAnswers.length);
  }
}
function ExamReportsComponent_div_198_Template(rf, ctx) {
  if (rf & 1) {
    const _r396 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r396);
      const ctx_r395 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r395.closeWrongAnswerSummary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 265);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 121)(3, "div", 122)(4, "div", 124)(5, "div", 123)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "rule_folder");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 266)(9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Wrong Answer Summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 267);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Details for selected question");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_198_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r396);
      const ctx_r398 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r398.closeWrongAnswerSummary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ExamReportsComponent_div_198_div_17_Template, 18, 3, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r36.selectedQuestionForWrongSummary);
  }
}
function ExamReportsComponent_div_199_div_17_li_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li")(1, "div", 278);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 279);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const r_r402 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](r_r402.full_name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](r_r402.email || "");
  }
}
function ExamReportsComponent_div_199_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "ul", 277);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ExamReportsComponent_div_199_div_17_li_2_Template, 5, 2, "li", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r399 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r399.selectedResources);
  }
}
function ExamReportsComponent_div_199_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No resources linked for this wrong answer.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ExamReportsComponent_div_199_Template(rf, ctx) {
  if (rf & 1) {
    const _r404 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_199_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r404);
      const ctx_r403 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r403.closeResourcePanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 265);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_199_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 121)(3, "div", 122)(4, "div", 124)(5, "div", 123)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "folder_shared");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 266)(9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Resources");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 275);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Resources related to the selected wrong answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "button", 276);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_199_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r404);
      const ctx_r406 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r406.closeResourcePanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ExamReportsComponent_div_199_div_17_Template, 3, 1, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, ExamReportsComponent_div_199_div_18_Template, 2, 0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 131)(20, "button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_div_199_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r404);
      const ctx_r407 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r407.closeResourcePanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r37.selectedResources && ctx_r37.selectedResources.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r37.selectedResources || !ctx_r37.selectedResources.length);
  }
}
const _c7 = function () {
  return ["category", "questions", "users_attempted", "total_attempts", "mistakes", "error_pct"];
};
const _c8 = function () {
  return ["sno", "question", "user_attempts", "attempts", "mistakes"];
};
class ExamReportsComponent {
  get totalPages() {
    return Math.max(1, Math.ceil((this.userReportTotal || 0) / this.pageSize));
  }
  get userAverageScore() {
    const scores = (this.userReportData || []).map(row => this.toMetricNumber(row.marks_obtained ?? row.score ?? row.marks)).filter(value => value > 0);
    return scores.length ? scores.reduce((sum, value) => sum + value, 0) / scores.length : 0;
  }
  get userPassRate() {
    const rows = this.userReportData || [];
    const passed = rows.filter(row => String(row.result || row.status || '').toLowerCase() === 'pass').length;
    return rows.length ? passed / rows.length * 100 : 0;
  }
  get analyticsTotalAttempts() {
    return (this.categoryAnalytics || []).reduce((sum, item) => sum + this.toMetricNumber(item.total_attempts ?? item.attempts), 0);
  }
  get analyticsMistakeCount() {
    return (this.categoryAnalytics || []).reduce((sum, item) => sum + this.toMetricNumber(item.wrong_answers ?? item.mistakes ?? item.wrong_count), 0);
  }
  get activeQuestionCount() {
    return (this.filteredQuestionSummary && this.filteredQuestionSummary.length ? this.filteredQuestionSummary : this.questionSummary || []).length;
  }
  /**
   * Open question summary filtered to a specific category. If analytics data isn't loaded yet,
   * request it first and apply a pending filter.
   */
  openCategoryQuestionSummary(category) {
    if (!category) return;
    const cid = String(category.category_id || category.id || category._id || category.categoryId || '');
    if (!cid) return;
    // ensure main tab is analytics
    this.activeMainTabIndex = 1;
    // if question summary already loaded, filter immediately
    if (this.questionSummary && this.questionSummary.length) {
      this.filteredQuestionSummary = (this.questionSummary || []).filter(q => this._getQuestionCategoryId(q) === cid);
      this.innerAnalyticsTabIndex = 1; // switch inner tab to Question Summary
      return;
    }
    // otherwise, request analytics and apply filter after load
    this._pendingCategoryFilter = cid;
    this.loadAnalytics();
  }
  constructor(http, loading, overlay, vcr, pageMeta, _snack, confirm) {
    this.http = http;
    this.loading = loading;
    this.overlay = overlay;
    this.vcr = vcr;
    this.pageMeta = pageMeta;
    this._snack = _snack;
    this.confirm = confirm;
    this.reportsApplied = false;
    this.appliedFilters = null;
    this.categoryAnalytics = [];
    this.questionSummary = [];
    this.filteredQuestionSummary = [];
    this.wrongDistribution = [];
    // wrong answer modal state
    this.showWrongAnswerSummary = false;
    this.selectedQuestionForWrongSummary = null;
    this.selectedWrongAnswers = [];
    // resources modal state
    this.showResourcePanel = false;
    this.selectedResources = [];
    this.selectedResourceContext = null; // { question, wrongAnswer }
    // user report state
    this.userReportData = [];
    this.userReportTotal = 0;
    // user review panel state
    this.showUserReviewPanel = false;
    this.userReviewAttempts = [];
    this.userReviewLoading = false;
    this.selectedUserName = null;
    this.selectedUserScore = null;
    this.selectedUserResult = null;
    this.totalQuestions = null;
    this.totalMarks = null;
    this.pageSize = 25;
    this.currentPage = 1;
    this.searchQuery = '';
    this.commentEdit = false;
    this.updatedBy = '';
    // placeholders for template bindings
    this.examCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('');
    this.instituteCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('');
    this.filteredInstitutes$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)([]);
    this.filteredTests$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)([]);
    this.allTests = [];
    this.selectedExam = null;
    this.activeMainTabIndex = 0;
    this.innerAnalyticsTabIndex = 0;
    this.userFilterOpen = false;
    this.userFilters = {
      department_id: '',
      teams_id: '',
      country_id: '',
      city_id: '',
      campus_id: ''
    };
    this.countries = [];
    this.cities = [];
    this.campusList = [];
    this.departmentList = [];
    this.teamList = [];
    this.institutes = [];
    this.selectedInstituteId = null;
    // simple pagination controls without MatPaginator binding
    this.loadingUserReport = false;
    this.filtersOverlayRef = null;
    this._subs = null;
    this.resetFilters = {};
    this._pendingCategoryFilter = null;
  }
  // Robustly extract a category id from different question shapes.
  _getQuestionCategoryId(q) {
    if (!q) return '';
    // If question has a nested `category` object, try common id fields
    const cat = q.category;
    if (cat && typeof cat === 'object') {
      return String(cat.id || cat._id || cat.category_id || cat.categoryId || cat.cat_id || '').trim();
    }
    // If category_id is an array, take first element
    if (Array.isArray(q.category_id) && q.category_id.length) return String(q.category_id[0]).trim();
    // Try several flat fields
    return String(q.category_id ?? q.category ?? q.categoryId ?? q.cat_id ?? q.catId ?? '').trim();
  }
  toMetricNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  // Normalize selected_option into an array of trimmed strings.
  _normalizeSelectedOption(selected) {
    try {
      if (!selected && selected !== 0) return [];
      if (Array.isArray(selected)) {
        // flatten items that might be comma-separated strings
        return selected.flatMap(it => {
          if (typeof it === 'string') return it.split(',').map(s => s.trim()).filter(Boolean);
          return [String(it)];
        });
      }
      if (typeof selected === 'string') {
        return selected.split(',').map(s => s.trim()).filter(Boolean);
      }
      // fallback to single value
      return [String(selected)];
    } catch (e) {
      return [];
    }
  }
  // Return review comments for a question filtered by one or more categories.
  // `categories` can be a string or an array of strings. Comparison is case-insensitive.
  reviewComments(q, categories) {
    try {
      const comments = q && q.review_comment && Array.isArray(q.review_comment.comments) ? q.review_comment.comments : [];
      if (!comments || !comments.length) return [];
      const cats = Array.isArray(categories) ? categories.map(String) : [String(categories)];
      const normalized = cats.map(c => (c || '').toString().toLowerCase());
      return (comments || []).filter(c => normalized.includes((c && c.category || '').toString().toLowerCase()));
    } catch (e) {
      return [];
    }
  }
  // Open user review by calling backend API /review-user-exam
  openUserReview(row) {
    if (!row) return;
    // set header fields used in template
    try {
      this.selectedUserName = row.student_name || row.name || row.user_name || row.full_name || null;
      this.selectedUserScore = row.marks_obtained ?? row.score ?? row.marks ?? null;
      this.selectedUserResult = row.result ?? row.status ?? null;
      this.totalQuestions = row.total_questions || row.total || null;
      this.totalMarks = row.total_marks || row.totalMarks || null;
    } catch (e) {
      this.selectedUserName = null;
      this.selectedUserScore = null;
      this.selectedUserResult = null;
      this.totalQuestions = null;
      this.totalMarks = null;
    }
    const userId = row.user_id || row.student_id || row.id || row.userId || null;
    const scheduleId = String(this.selectedExam?.schedule_id || this.selectedExam?.id || this.selectedExam?.scheduleId || '');
    if (!userId || !scheduleId) return;
    const params = {
      user_id: String(userId),
      scheduler_id: scheduleId
    };
    // if browser is offline, show a retry snackbar instead of firing the request
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const snack = this._snack.open('You appear to be offline. Retry?', 'Retry', {
        duration: 10000
      });
      snack.onAction().subscribe(() => this.fetchUserReview(params));
      return;
    }
    this.fetchUserReview(params);
  }
  fetchUserReview(params) {
    this.userReviewLoading = true;
    this.loading.show();
    this.http.get(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/review-user-exam`, {
      params
    }).subscribe({
      next: res => {
        try {
          const body = res || {};
          // backend returns { data: [ attemptObj, ... ] }
          let attempts = [];
          if (Array.isArray(body.data)) {
            attempts = body.data;
          } else if (Array.isArray(body)) {
            attempts = body;
          } else if (Array.isArray(body?.data?.data)) {
            attempts = body.data.data;
          } else if (Array.isArray(body?.attempts)) {
            attempts = body.attempts;
          }
          // normalize each attempt: ensure review/questions array exists and normalize selected options
          this.userReviewAttempts = (attempts || []).map(a => {
            const reviewList = a.review || a.questions || a.attempt_review || [];
            const normalizedReview = (Array.isArray(reviewList) ? reviewList : []).map(q => {
              try {
                // normalize selected_option into array of values
                q.selected_option = this._normalizeSelectedOption(q.selected_option || q.selected_options || q.selected || []);
                // also ensure options is an array
                if (!Array.isArray(q.options) && q.options && typeof q.options === 'object') {
                  // sometimes options come as an object map, convert to array
                  q.options = Object.keys(q.options).map(k => q.options[k]);
                }
              } catch (e) {}
              return q;
            });
            return {
              ...a,
              review: normalizedReview
            };
          });
          // If total marks not set from the row, try to take it from the first attempt returned
          if ((this.totalMarks === null || this.totalMarks === undefined) && this.userReviewAttempts && this.userReviewAttempts.length) {
            const first = this.userReviewAttempts[0] || {};
            this.totalMarks = first.total_marks ?? first.totalMarks ?? first.total ?? null;
            // also set selectedUserScore fallback if not available from the row
            if ((this.selectedUserScore === null || this.selectedUserScore === undefined) && (first.score || first.marks || first.marks_obtained || first.percentage !== undefined)) {
              this.selectedUserScore = first.score ?? first.marks ?? first.marks_obtained ?? null;
            }
            // ensure totalQuestions if missing
            if ((this.totalQuestions === null || this.totalQuestions === undefined) && (first.total_questions || first.totalQuestions || first.totalQuestionsCount)) {
              this.totalQuestions = first.total_questions ?? first.totalQuestions ?? null;
            }
          }
        } catch (e) {
          console.warn('Failed to parse review-user-exam response', e);
          this.userReviewAttempts = [];
        }
        this.loading.hide();
        this.userReviewLoading = false;
        if (!this.userReviewAttempts || !this.userReviewAttempts.length) {
          this._snack.open('No review data available for this user.', 'Close', {
            duration: 4000
          });
          this.showUserReviewPanel = false;
        } else {
          this.showUserReviewPanel = true;
        }
      },
      error: err => {
        console.error('[TestReports] review-user-exam failed', err);
        this.userReviewLoading = false;
        this.userReviewAttempts = [];
        if (err && err.status === 0) {
          const snack = this._snack.open('Network or server unreachable — check backend and network.', 'Retry', {
            duration: 8000
          });
          snack.onAction().subscribe(() => {
            // retry once
            this.fetchUserReview(params);
          });
        } else {
          const msg = err && err.error && err.error.statusMessage ? err.error.statusMessage : err && err.message ? err.message : 'Failed to load review data.';
          this._snack.open(msg, 'Close', {
            duration: 5000
          });
        }
        this.showUserReviewPanel = false;
        this.loading.hide();
      }
    });
  }
  closeUserReview() {
    this.showUserReviewPanel = false;
    this.userReviewAttempts = [];
    this.selectedUserName = null;
    this.selectedUserScore = null;
    this.selectedUserResult = null;
    this.totalQuestions = null;
    this.totalMarks = null;
  }
  // Marks editing helpers for descriptive questions
  startEditMarks(q) {
    if (!q) return;
    q._editingMarks = true;
    q._editedMarks = q.marks_awarded ?? 0;
  }
  cancelEditMarks(q) {
    if (!q) return;
    q._editingMarks = false;
    q._editedMarks = undefined;
  }
  saveMarks(q, row) {
    if (!q) return;
    const newMarks = parseFloat(q._editedMarks);
    if (isNaN(newMarks) || newMarks < 0) {
      this._snack.open('Please enter a valid mark value', 'Close', {
        duration: 3000
      });
      return;
    }
    const maxMarks = q.question_marks || q.marks || 0;
    if (newMarks > maxMarks) {
      this._snack.open(`Marks cannot exceed ${maxMarks}`, 'Close', {
        duration: 3000
      });
      return;
    }
    // Get required IDs
    const answerID = q.answer_id || null;
    // Get user ID from current context
    const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    let updatedBy = '';
    if (raw) {
      const u = JSON.parse(raw);
      updatedBy = u.user_id || u.id || u.userId || u._id || '';
    }
    if (!answerID) {
      console.warn('[saveMarks] Missing answer ID:', {
        answerID
      });
      this._snack.open('Missing answer ID', 'Close', {
        duration: 3000
      });
      return;
    }
    const payload = {
      answer_id: String(answerID),
      marks_awarded: newMarks,
      updated_by: updatedBy
    };
    this.loading.show();
    this.http.post(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/update-descriptive-marks`, payload).subscribe({
      next: res => {
        this.loading.hide();
        // Update local state
        const oldMarks = q.marks_awarded || 0;
        q.marks_awarded = newMarks;
        q._editingMarks = false;
        q._editedMarks = undefined;
        // Update total score if available
        if (this.selectedUserScore !== null && typeof this.selectedUserScore === 'number') {
          this.selectedUserScore = this.selectedUserScore - oldMarks + newMarks;
        }
        this._snack.open('Marks updated successfully', 'Close', {
          duration: 3000
        });
      },
      error: err => {
        this.loading.hide();
        console.error('Failed to update marks', err);
        const msg = err?.error?.statusMessage || err?.message || 'Failed to update marks.';
        this._snack.open(msg, 'Close', {
          duration: 5000
        });
      }
    });
  }
  // Begin review comment editing helpers
  startEditComment(rc) {
    if (!rc) return;
    // mark this comment as being edited and store original text
    rc._editing = true;
    rc._editedText = rc.comment_text || rc.comment || '';
    this.commentEdit = true;
  }
  cancelEditComment(rc) {
    if (!rc) return;
    rc._editing = false;
    rc._editedText = undefined;
    // if no other comment is being edited, clear global flag
    this.commentEdit = !!this.userReviewAttempts?.some(att => (att.review || []).some(q => (q.review_comment?.comments || []).some(c => c._editing)));
  }
  saveReviewComment(rc) {
    if (!rc) return;
    const newText = (rc._editedText || '').toString().trim();
    if (newText.length === 0) {
      this._snack.open('Comment cannot be empty', 'Close', {
        duration: 3000
      });
      return;
    }
    this.updateReviewComment('edit', rc, newText);
  }
  confirmDeleteComment(rc) {
    if (!rc) return;
    this.confirm.confirm({
      title: 'Delete comment',
      message: 'Are you sure you want to delete this review comment?'
    }).subscribe(confirmed => {
      if (confirmed) this.updateReviewComment('delete', rc, rc._editedText || rc.comment_text || rc.comment || '');
    });
  }
  updateReviewComment(action, rc, text) {
    if (!rc) return;
    const commentId = rc.comment_id || rc.id || rc._id || rc.commentId || rc.cid || null;
    if (!commentId) {
      this._snack.open('Comment id not found', 'Close', {
        duration: 3000
      });
      return;
    }
    const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    // history_id required for delete action
    const historyId = rc.history_id || rc.hid || rc._hid || null;
    if (raw) {
      const u = JSON.parse(raw);
      this.updatedBy = u.user_id || u.id || u.userId || u._id || '';
    }
    const payload = {
      comment_id: String(commentId),
      history_id: String(historyId),
      text: text || '',
      updated_by: this.updatedBy
    };
    this.loading.show();
    this.http.post(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/update-review-comments/${action}`, payload).subscribe({
      next: res => {
        this.loading.hide();
        // apply changes locally
        if (action === 'edit') {
          rc.comment_text = text;
          rc.updated_by = this.updatedBy;
          rc._editing = false;
          rc._editedText = undefined;
          this._snack.open('Comment updated', 'Close', {
            duration: 3000
          });
        } else if (action === 'delete') {
          rc.is_deleted = 1;
          rc.updated_by = this.updatedBy;
          this._snack.open('Comment deleted', 'Close', {
            duration: 3000
          });
        }
        // clear global edit flag if no edits remain
        this.commentEdit = !!this.userReviewAttempts?.some(att => (att.review || []).some(q => (q.review_comment?.comments || []).some(c => c._editing)));
      },
      error: err => {
        this.loading.hide();
        console.error('Failed to update review comment', err);
        const msg = err && err.error && err.error.statusMessage ? err.error.statusMessage : err && err.message ? err.message : 'Failed to update comment.';
        this._snack.open(msg, 'Close', {
          duration: 5000
        });
      }
    });
  }
  onApply(payload) {
    this.appliedFilters = payload;
    this.reportsApplied = true;
  }
  onReset() {
    this.appliedFilters = null;
    this.reportsApplied = false;
    this.categoryAnalytics = [];
    this.questionSummary = [];
    this.wrongDistribution = [];
  }
  // Reset filters to empty and reload scheduled tests, then close overlay.
  resetFiltersAndReload() {
    this.resetFilters = {
      department_id: '',
      teams_id: '',
      country_id: '',
      city_id: '',
      campus_id: ''
    };
    try {
      this.loadScheduledTest();
    } catch (e) {}
    try {
      this.closeFiltersOverlay();
    } catch (e) {}
  }
  displayTest(exam) {
    return exam ? exam.title || exam.name || '' : '';
  }
  onTestAutocompleteSelected(exam) {
    this.selectedExam = exam;
    // auto-load report for the currently active main tab
    if (this.activeMainTabIndex === 0) {
      this.loadUserReport(1);
    } else if (this.activeMainTabIndex === 1) {
      this.loadAnalytics();
    }
  }
  closeUserFilter() {
    this.userFilterOpen = false;
  }
  loadInstitutes() {
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/institutes/list`;
    this.http.get(url).subscribe({
      next: res => {
        const list = Array.isArray(res) ? res : res?.institutes || res?.data || [];
        this.institutes = (list || []).map(i => ({
          id: String(i.id || i.institute_id || i._id || ''),
          name: i.name || i.institute || 'Institute'
        }));
        // setup filtered institutes observable
        try {
          this.filteredInstitutes$ = this.instituteCtrl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.startWith)(''), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)(val => {
            const q = (typeof val === 'string' ? val : val?.name || '').toLowerCase();
            return (this.institutes || []).filter(it => (it.name || '').toLowerCase().includes(q));
          }));
        } catch (e) {
          this.filteredInstitutes$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(this.institutes || []);
        }
        const loginInst = sessionStorage.getItem('global_institute_id') || sessionStorage.getItem('institute_id') || sessionStorage.getItem('instituteId');
        if (loginInst) this.selectedInstituteId = String(loginInst);else if (this.institutes.length) this.selectedInstituteId = this.institutes[0].id;
        // set instituteCtrl display value
        const selected = this.institutes.find(i => i.id === this.selectedInstituteId);
        if (selected) {
          try {
            this.instituteCtrl.setValue(selected);
            this.onInstituteChange(this.selectedInstituteId);
          } catch (e) {}
        }
      },
      error: err => console.warn('Failed to load institutes', err)
    });
  }
  onInstituteSelected(inst) {
    if (!inst) return;
    this.selectedInstituteId = inst.id;
    // populate dependent filter lists then load exams
    try {
      this.loadDepartmentList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadTeamsList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadCampusList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadCountries();
    } catch (e) {}
    this.loadScheduledTest();
  }
  displayInstitute(i) {
    return i ? i.name : '';
  }
  onInstituteChange(id) {
    this.selectedInstituteId = id;
    try {
      this.loadDepartmentList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadTeamsList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadCampusList(this.selectedInstituteId);
    } catch (e) {}
    try {
      this.loadCountries();
    } catch (e) {}
    this.loadScheduledTest();
  }
  loadCountries() {
    // reuse location-hierarchy endpoint used elsewhere
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/location-hierarchy`;
    this.http.get(url).subscribe({
      next: res => {
        try {
          const countries = res?.data?.countries || res?.countries || res?.data || [];
          this.countries = countries.map(c => ({
            code: c.country_code || c.code || c.id,
            name: c.country_name || c.name || c.country
          }));
        } catch (e) {
          this.countries = [];
        }
      },
      error: () => {
        this.countries = [];
      }
    });
  }
  onCountryChange() {
    this.cities = [];
    if (!this.userFilters.country_id) return;
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/location-hierarchy`;
    this.http.get(url, {
      params: {
        country: this.userFilters.country_id
      }
    }).subscribe({
      next: res => {
        try {
          let allCities = [];
          const countries = res?.data?.countries || res?.countries || [];
          if (Array.isArray(countries)) {
            countries.forEach(c => {
              if (Array.isArray(c.cities)) allCities = allCities.concat(c.cities);
              if (Array.isArray(c.states)) c.states.forEach(s => {
                if (Array.isArray(s.cities)) allCities = allCities.concat(s.cities);
              });
            });
          }
          if (allCities.length === 0 && (res?.data?.cities || res?.cities)) allCities = res?.data?.cities || res?.cities || [];
          this.cities = (allCities || []).map(c => ({
            code: c.city_code || c.code || c.id,
            name: c.city_name || c.name || c.city
          }));
        } catch (e) {
          this.cities = [];
        }
      },
      error: () => {
        this.cities = [];
      }
    });
  }
  // load department list for a specific institute
  loadDepartmentList(instituteId) {
    this.departmentList = [];
    if (!instituteId) return;
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-department-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get(url).subscribe({
      next: res => {
        const arr = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.departmentList = arr.map(d => (d.name || d.department_name || d.department || d).toString()).filter(s => !!s);
      },
      error: err => {
        console.warn('Failed to load department list', err);
        this.departmentList = [];
      }
    });
  }
  // load teams list for a specific institute
  loadTeamsList(instituteId) {
    this.teamList = [];
    if (!instituteId) return;
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-teams-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get(url).subscribe({
      next: res => {
        const arr = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.teamList = arr.map(t => (t.name || t.team_name || t.team || t).toString()).filter(s => !!s);
      },
      error: err => {
        console.warn('Failed to load teams list', err);
        this.teamList = [];
      }
    });
  }
  // load campus list for a specific institute
  loadCampusList(instituteId) {
    this.campusList = [];
    if (!instituteId) return;
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-campus-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get(url).subscribe({
      next: res => {
        console.debug('[TestReports] get-campus-list response for', instituteId, res);
        const arr = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.campusList = arr.map(c => (c.name || c.campus_name || c.campus || c).toString()).filter(s => !!s);
      },
      error: err => {
        console.warn('Failed to load campus list', err);
        this.campusList = [];
      }
    });
  }
  loadScheduledTest() {
    // call API (use API_BASE) and populate filteredTests$
    const url = `${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-exam-schedule-details`;
    this.loading.show();
    this.http.get(url, {
      params: {
        institute_id: this.selectedInstituteId || '',
        country_id: this.userFilters.country_id || '',
        city_id: this.userFilters.city_id || '',
        campus_id: this.userFilters.campus_id || ''
      }
    }).subscribe({
      next: res => {
        try {
          const items = Array.isArray(res) ? res : res?.data || res?.schedules || [];
          this.allTests = items || [];
          // set up filtered observable to react to user typing
          try {
            this.filteredTests$ = this.examCtrl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.startWith)(''), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)(val => {
              const q = (typeof val === 'string' ? val : val?.title || val?.name || '').toLowerCase();
              return (this.allTests || []).filter(it => (it.title || it.name || '').toLowerCase().includes(q));
            }));
          } catch (e) {
            this.filteredTests$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(this.allTests || []);
          }
        } catch (e) {
          this.filteredTests$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)([]);
          console.warn('Failed to load schedules', e);
        }
        try {
          this.loading.hide();
        } catch (e) {}
      },
      error: err => {
        this.filteredTests$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)([]);
        console.warn('Failed to load schedules', err);
        try {
          this.loading.hide();
        } catch (e) {}
      }
    });
  }
  ngOnInit() {
    try {
      this.pageMeta.setMeta('Test Reports', 'Reports for scheduled tests');
    } catch (e) {}
    this.loadInstitutes();
    // load countries for filter dropdowns
    try {
      this.loadCountries();
    } catch (e) {}
  }
  // Helper to convert option index to letter (0 -> A, 1 -> B, ...)
  getOptionLetter(i) {
    try {
      return String.fromCharCode(65 + (Number(i) || 0));
    } catch (e) {
      return '' + i;
    }
  }
  openFiltersOverlay() {
    if (!this.filtersBtn) return;
    if (this.filtersOverlayRef) {
      try {
        this.filtersOverlayRef.dispose();
      } catch (e) {}
      ;
      this.filtersOverlayRef = null;
    }
    const positionStrategy = this.overlay.position().flexibleConnectedTo(this.filtersBtn).withPositions([{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8
    }, {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8
    }]).withPush(true);
    this.filtersOverlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    this.filtersOverlayRef.backdropClick().subscribe(() => this.closeFiltersOverlay());
    this.filtersOverlayRef.keydownEvents().subscribe(ev => {
      if (ev.key === 'Escape') this.closeFiltersOverlay();
    });
    const portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_9__.TemplatePortal(this.filtersPanelTpl, this.vcr);
    this.filtersOverlayRef.attach(portal);
  }
  closeFiltersOverlay() {
    if (this.filtersOverlayRef) {
      try {
        this.filtersOverlayRef.dispose();
      } catch (e) {}
      ;
      this.filtersOverlayRef = null;
    }
  }
  ngOnDestroy() {
    try {
      this._subs?.unsubscribe();
    } catch (e) {}
    try {
      this.closeFiltersOverlay();
    } catch (e) {}
  }
  onTabChange(event) {
    const idx = event.index;
    // 0 => User Report, 1 => Category Report
    if (!this.selectedExam) {
      // nothing selected
      return;
    }
    if (idx === 0) {
      this.loadUserReport(1);
    } else if (idx === 1) {
      this.loadAnalytics();
    }
  }
  loadUserReport(page = 1) {
    if (!this.selectedExam) return;
    this.currentPage = page || 1;
    const params = {
      schedule_id: String(this.selectedExam.schedule_id || this.selectedExam.id || this.selectedExam.scheduleId || ''),
      page: String(this.currentPage),
      page_size: String(this.pageSize)
    };
    if (this.searchQuery) params.q = this.searchQuery;
    this.loadingUserReport = true;
    try {
      this.loading.show();
    } catch (e) {}
    this.http.get(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-exam-user-report`, {
      params
    }).subscribe({
      next: res => {
        console.debug('[TestReports] get-exam-user-report response:', res);
        try {
          const body = res || {};
          const payload = body.data || body; // support responses with { data: { items: [...] } }
          if (payload && Array.isArray(payload.items)) {
            this.userReportData = payload.items;
            this.userReportTotal = Number(payload.total ?? payload.count ?? (payload.items || []).length);
          } else if (Array.isArray(payload)) {
            this.userReportData = payload;
            this.userReportTotal = this.userReportData.length;
          } else {
            // fallback
            this.userReportData = [];
            this.userReportTotal = 0;
          }
        } catch (e) {
          console.warn('Error parsing user report response', e);
          this.userReportData = [];
          this.userReportTotal = 0;
        } finally {
          this.loadingUserReport = false;
          try {
            this.loading.hide();
          } catch (e) {}
        }
      },
      error: err => {
        console.error('[TestReports] Failed to load user report', err);
        this.userReportData = [];
        this.userReportTotal = 0;
        this.loadingUserReport = false;
        try {
          this.loading.hide();
        } catch (e) {}
      },
      complete: () => {
        try {
          this.loading.hide();
        } catch (e) {}
      }
    });
  }
  prevPage() {
    if (this.currentPage > 1) this.loadUserReport(this.currentPage - 1);
  }
  nextPage() {
    const totalPages = Math.ceil((this.userReportTotal || 0) / this.pageSize);
    if (this.currentPage < totalPages) this.loadUserReport(this.currentPage + 1);
  }
  exportUserCSV() {
    if (!this.userReportData || !this.userReportData.length) return;
    const headers = ['Student Name', 'Questions Attempted', 'Total Marks', 'Correct Answers', 'Wrong Answers', 'Marks Obtained', 'Result'];
    const rows = this.userReportData.map(r => [r.student_name, r.questions_attempted, r.total_marks, r.correct_answers, r.wrong_answers, r.marks_obtained, r.result]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam_user_report_${this.selectedExam ? this.selectedExam.schedule_id || this.selectedExam.id : 'report'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  loadAnalytics() {
    if (!this.selectedExam) return;
    const params = {
      schedule_id: String(this.selectedExam.schedule_id || this.selectedExam.id || '')
    };
    try {
      this.loading.show();
    } catch (e) {}
    this.http.get(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-exam-analytics`, {
      params
    }).subscribe({
      next: res => {
        console.debug('[TestReports] get-exam-analytics response:', res);
        try {
          const body = res || {};
          const payload = body.data || body;
          this.categoryAnalytics = Array.isArray(payload.category_report) ? payload.category_report : payload.category_report || payload.categories || [];
          this.questionSummary = Array.isArray(payload.question_summary) ? payload.question_summary : payload.question_summary || payload.questions || [];
          this.wrongDistribution = Array.isArray(payload.wrong_answer_distribution) ? payload.wrong_answer_distribution : payload.wrong_answer_distribution || payload.distribution || [];
          // If a category filter was requested while loading, apply it now
          if (this._pendingCategoryFilter) {
            const cid = String(this._pendingCategoryFilter);
            this.filteredQuestionSummary = (this.questionSummary || []).filter(q => this._getQuestionCategoryId(q) === cid);
            this._pendingCategoryFilter = null;
            // ensure UI switches to analytics -> Question Summary tab
            try {
              this.activeMainTabIndex = 1;
              this.innerAnalyticsTabIndex = 1;
            } catch (e) {}
          } else {
            this.filteredQuestionSummary = [];
          }
        } catch (e) {
          console.error('[TestReports] Error parsing analytics response', e);
          this.categoryAnalytics = [];
          this.questionSummary = [];
          this.wrongDistribution = [];
        } finally {
          try {
            this.loading.hide();
          } catch (e) {}
        }
      },
      error: err => {
        console.error('[TestReports] Failed to load analytics', err);
        this.categoryAnalytics = [];
        this.questionSummary = [];
        this.wrongDistribution = [];
        try {
          this.loading.hide();
        } catch (e) {}
      },
      complete: () => {
        try {
          this.loading.hide();
        } catch (e) {}
      }
    });
  }
  // Open a small modal-like inline panel to show wrong answer summary for a question
  openWrongAnswerSummary(question) {
    if (!question) return;
    this.selectedQuestionForWrongSummary = question;
    // Find wrong answers for the question from wrongDistribution
    // wrongDistribution may be an array of { question_id, wrong_answers: [{ answer, count, pct }] }
    const qid = question.id || question.question_id || question.sno || question.qid || null;
    let entries = [];
    try {
      if (Array.isArray(this.wrongDistribution) && this.wrongDistribution.length) {
        // try multiple shapes
        // shape1: [{ question_id: '123', wrong_answers: [{ answer: 'A', count: 3, pct: '11%' }, ...] }, ...]
        const byQ = this.wrongDistribution.find(d => String(d.question_id || d.qid || d.id || d.sno || '') === String(qid));
        if (byQ) {
          entries = byQ.wrong_answers || byQ.wrong || byQ.answers || byQ.distribution || [];
        } else {
          // shape2: flat list of wrong answers with question ref
          entries = (this.wrongDistribution || []).filter(d => String(d.question_id || d.qid || d.schedule_question_id || '') === String(qid));
        }
      }
    } catch (e) {
      entries = [];
    }
    // Normalize entries to { answer, count, pct }
    this.selectedWrongAnswers = (entries || []).map((en, idx) => {
      if (typeof en === 'string') return {
        answer: en,
        count: null,
        pct: null
      };
      return {
        id: en.id || en._id || null,
        answer: en.option_text || en.text || en.wrong_answer || en.name || en.label || en.option || 'Answer ' + (idx + 1),
        option_id: en.option_id || en.options_id || en.optionId || en.optionId || null,
        answer_id: en.answer_id || en.answerId || null,
        count: en.count || en.times || en.selected_count || en.selected || en.num || null,
        pct: en.pct || en.percentage || en.percent || en.pct_str || (en.count && this.selectedQuestionForWrongSummary && this.selectedQuestionForWrongSummary.attempts ? (Number(en.count) / Number(this.selectedQuestionForWrongSummary.attempts || 1) * 100).toFixed(0) + '%' : null)
      };
    });
    // If no entries found locally, attempt to fetch per-question distribution from backend
    if (!this.selectedWrongAnswers.length) {
      const params = {
        schedule_id: String(this.selectedExam?.schedule_id || this.selectedExam?.id || ''),
        question_id: String(question.question_id || question.id || question.qid || '')
      };
      if (params.schedule_id && params.question_id) {
        this.http.get(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-question-wrong-answers`, {
          params
        }).subscribe({
          next: res => {
            const body = res || {};
            const payload = body.data || body;
            const dist = payload?.distribution || [];
            this.selectedWrongAnswers = (dist || []).map(d => ({
              answer: d.option_text || d.option || d.answer || d.text || 'Answer',
              option_id: d.option_id || d.options_id || d.optionId || null,
              answer_id: d.answer_id || d.answerId || null,
              count: d.count || d.selected_count || 0,
              pct: d.percentage !== undefined ? String(d.percentage) + '%' : d.pct || null
            }));
            if (!this.selectedWrongAnswers.length) {
              // fallback to raw list
              const raw = payload?.raw || [];
              this.selectedWrongAnswers = (raw || []).map(r => ({
                answer: r.text || r.option_text || 'Answer',
                count: r.count || 0,
                pct: null
              }));
            }
            this.showWrongAnswerSummary = true;
          },
          error: err => {
            console.warn('Failed to load question wrong answers', err);
            this.showWrongAnswerSummary = true; // show panel even if empty
          }
        });

        return;
      }
      const possible = question.wrong_answers || question.wrong || question.mistakes_detail || question.mistakes || question.wrong_distribution;
      if (possible && Array.isArray(possible)) {
        this.selectedWrongAnswers = possible.map((en, i) => ({
          answer: en.answer || en.text || en || 'Answer ' + (i + 1),
          count: en.count || en.times || null,
          pct: en.pct || null
        }));
      }
    }
    this.showWrongAnswerSummary = true;
  }
  closeWrongAnswerSummary() {
    this.showWrongAnswerSummary = false;
    this.selectedQuestionForWrongSummary = null;
    this.selectedWrongAnswers = [];
  }
  // Fetch resources for a specific wrong answer (option) and show central panel
  openResourcesForWrongAnswer(question, wa) {
    if (!question || !wa) return;
    this.selectedResourceContext = {
      question,
      wa
    };
    this.selectedResources = [];
    // build params including schedule and answer identifiers
    const params = {
      schedule_id: String(this.selectedExam?.schedule_id || this.selectedExam?.id || '')
    };
    if (wa.option_id) params.option_id = wa.option_id;else if (wa.optionId) params.option_id = wa.optionId;
    if (wa.answer_id) params.answer_id = wa.answer_id;else if (wa.answerId) params.answer_id = wa.answerId;
    // if written/free-text answer value is present, send it as answer_value
    if (wa.answer && typeof wa.answer === 'string' && !params.answer_id) {
      params.answer_value = wa.answer;
    }
    // ensure question_id fallback
    if (!params.question_id) params.question_id = String(question.question_id || question.id || question.qid || '');
    this.http.get(`${src_app_shared_api_config__WEBPACK_IMPORTED_MODULE_0__.API_BASE}/get-answer-resources`, {
      params
    }).subscribe({
      next: res => {
        const body = res || {};
        const payload = body.data || body;
        // backend returns either an array or an object with data/context
        if (Array.isArray(payload)) this.selectedResources = payload;else if (Array.isArray(body.data)) this.selectedResources = body.data;else if (Array.isArray(payload.resources)) this.selectedResources = payload.resources;else if (Array.isArray(body.data?.data)) this.selectedResources = body.data.data;else this.selectedResources = payload || [];
        // optional context
        if (body.context) this.selectedResourceContext = body.context;
        this.showResourcePanel = true;
      },
      error: err => {
        console.warn('Failed to fetch resources', err);
        this.showResourcePanel = true;
      }
    });
  }
  closeResourcePanel() {
    this.showResourcePanel = false;
    this.selectedResources = [];
    this.selectedResourceContext = null;
  }
  // Format a date like 'On DD-MMM-YYYY HH:MM'
  formatDate(dateLike) {
    if (!dateLike) return '';
    try {
      const d = new Date(dateLike);
      if (isNaN(d.getTime())) return '';
      const dd = String(d.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = months[d.getMonth()] || '';
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `On ${dd}-${m}-${yyyy} ${hh}:${min}`;
    } catch (e) {
      return '';
    }
  }
  // Convert string to Title Case
  toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  static {
    this.ɵfac = function ExamReportsComponent_Factory(t) {
      return new (t || ExamReportsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_shared_services_loader_service__WEBPACK_IMPORTED_MODULE_1__.LoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_shared_services_page_meta_service__WEBPACK_IMPORTED_MODULE_2__.PageMetaService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_shared_services_confirm_service__WEBPACK_IMPORTED_MODULE_3__.ConfirmService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: ExamReportsComponent,
      selectors: [["app-exam-reports"]],
      viewQuery: function ExamReportsComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.filtersBtn = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.filtersPanelTpl = _t.first);
        }
      },
      decls: 200,
      vars: 48,
      consts: [[1, "page", "exam-reports"], [1, "toolbar"], [1, "selections"], ["appearance", "outline", 1, "local-institute-field"], ["matPrefix", "", "svgIcon", "institute"], ["matInput", "", "placeholder", "Pick an institute", 3, "formControl", "matAutocomplete"], [3, "displayWith", "optionSelected"], ["instAuto", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outline"], ["matPrefix", "", "svgIcon", "exam"], ["type", "text", "matInput", "", "placeholder", "Pick a test", 3, "formControl", "matAutocomplete"], ["auto", "matAutocomplete"], [1, "controls"], [1, "action-row"], ["mat-stroked-button", "", "color", "primary", "type", "button", 1, "button-one", 3, "click"], ["svgIcon", "refresh"], ["mat-flat-button", "", "type", "button", 1, "button-one", 3, "click"], ["filtersBtn", ""], ["svgIcon", "filter"], ["filtersPanel", ""], [1, "list-card"], [1, "list-wrapper"], [1, "exam-tabs", 3, "selectedIndex", "selectedTabChange", "selectedIndexChange"], ["label", "User Report"], [1, "report-summary-grid"], [1, "summary-card"], [1, "summary-icon", "summary-icon--students"], [1, "summary-copy"], [1, "summary-label"], [1, "summary-value"], [1, "summary-meta"], [1, "summary-icon", "summary-icon--page"], [1, "summary-icon", "summary-icon--score"], [1, "summary-icon", "summary-icon--pass"], [1, "tab-actions"], [1, "search"], ["appearance", "outline", 1, "search-field"], ["matPrefix", ""], ["matInput", "", "placeholder", "Student Name ", 3, "ngModel", "ngModelChange"], ["mat-stroked-button", "", "color", "primary", "type", "button", 3, "click"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["class", "table-wrap", 4, "ngIf"], ["class", "loader-placeholder", 4, "ngIf"], ["label", "Analytics Report"], [1, "analytics-section"], [1, "report-summary-grid", "analytics-summary-grid"], [1, "summary-icon", "summary-icon--categories"], [1, "summary-icon", "summary-icon--questions"], [1, "summary-icon", "summary-icon--attempts"], [1, "summary-icon", "summary-icon--mistakes"], [1, "inner-analytics-tabs", 3, "selectedIndex", "selectedIndexChange"], ["label", "Question Bank Report"], [1, "table-wrap"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z1", "compact", "premium-table", 3, "dataSource"], ["matColumnDef", "category"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "cell-primary", 4, "matCellDef"], ["matColumnDef", "questions"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "users_attempted"], ["matColumnDef", "total_attempts"], ["matColumnDef", "mistakes"], ["matColumnDef", "error_pct"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["label", "Question Summary"], ["matColumnDef", "sno"], ["matColumnDef", "question"], ["matColumnDef", "user_attempts"], ["matColumnDef", "attempts"], ["class", "wrong-summary-backdrop", 3, "click", 4, "ngIf"], [3, "value"], [1, "option-main"], [1, "filters-panel", 3, "click"], [1, "filters-panel-header"], [1, "filter-block"], ["appearance", "outline", 1, "filter-item"], ["name", "filterCountry", 3, "ngModel", "ngModelChange", "selectionChange"], ["value", ""], ["name", "filterCity", 3, "ngModel", "ngModelChange"], ["name", "filterCampus", 3, "ngModel", "ngModelChange"], ["name", "filterDepartment", 3, "ngModel", "ngModelChange"], ["name", "filterTeam", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Test schedule after", 3, "matDatepicker", "ngModel", "ngModelChange"], ["matSuffix", "", 3, "for"], ["joinAfter", ""], ["matInput", "", "placeholder", "Test schedule before", 3, "matDatepicker", "ngModel", "ngModelChange"], ["joinBefore", ""], [1, "filter-actions"], ["mat-flat-button", "", 1, "filter-apply-btn", 3, "click"], ["svgIcon", "apply"], ["mat-flat-button", "", 1, "filter-reset-btn", 3, "click"], ["svgIcon", "reset_settings"], ["matColumnDef", "student_name"], ["matColumnDef", "questions_attempted"], ["matColumnDef", "correct_answers"], ["matColumnDef", "wrong_answers"], ["matColumnDef", "result"], [1, "pager"], ["mat-button", "", 3, "disabled", "click"], ["mat-header-cell", ""], ["mat-cell", "", 1, "cell-primary"], [1, "student-cell", 3, "click"], [1, "student-avatar"], [1, "student-name"], ["mat-cell", ""], [1, "marks-inline"], [1, "marks-sep"], [1, "pct-badge"], [1, "review-status"], [1, "result-pill"], ["mat-header-row", ""], ["mat-row", ""], [1, "loader-placeholder"], [1, "category-cell", 3, "click"], [1, "category-avatar"], ["href", "javascript:void(0)", "class", "wrong-summary-link", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 1, "wrong-summary-link", 3, "click"], [1, "wrong-summary-backdrop", 3, "click"], [1, "wrong-summary-panel", "user-review-panel", 3, "click"], [1, "card"], [1, "panel-header"], [1, "header-icon"], [1, "header-info"], [1, "score"], [1, "result", 3, "ngClass"], ["mat-icon-button", "", "aria-label", "Close", "type", "button", 3, "click"], [1, "panel-body"], ["class", "muted", 4, "ngIf"], [4, "ngIf"], [1, "summary-actions"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "muted"], [4, "ngIf", "ngIfElse"], ["noUserReview", ""], [4, "ngFor", "ngForOf"], [1, "questions-list"], ["class", "question-review-card", 4, "ngFor", "ngForOf"], [1, "question-review-card"], [1, "q-head-row"], [1, "q-left"], [1, "q-index"], [1, "q-body"], [1, "q-meta"], [1, "q-badge"], ["class", "q-info", 4, "ngIf"], [1, "q-text"], [1, "q-right"], ["class", "marks-container", 4, "ngIf"], ["class", "q-marks small-muted", 3, "ngClass", 4, "ngIf"], ["class", "q-fill", 4, "ngIf"], ["class", "q-descriptive", 4, "ngIf"], ["class", "q-options two-col", 4, "ngIf"], [1, "q-info"], ["svgIcon", "brain"], [1, "marks-container"], ["class", "marks-display", 4, "ngIf"], ["class", "marks-edit", 4, "ngIf"], [1, "marks-display"], [1, "q-marks", "small-muted", 3, "ngClass"], ["mat-icon-button", "", "type", "button", "title", "Edit marks", 1, "edit-marks-btn", 3, "click"], [1, "marks-edit"], ["type", "number", "step", "0.5", 1, "marks-input", 3, "ngModel", "min", "max", "ngModelChange"], [1, "marks-max"], ["mat-icon-button", "", "type", "button", "title", "Save marks", 1, "save-marks-btn", 3, "click"], ["mat-icon-button", "", "type", "button", "title", "Cancel", 1, "cancel-marks-btn", 3, "click"], [1, "q-fill"], [1, "fill-row"], [1, "fill-option"], ["class", "fill-correct", 4, "ngIf"], [1, "fill-correct"], [1, "q-descriptive"], ["class", "q-feedback", 4, "ngIf"], ["class", "q-review-comments", 4, "ngIf"], [1, "desc-student"], [1, "student-label"], [1, "answer-text"], [1, "desc-model"], [1, "model-label"], [1, "model-text"], ["class", "marks-history-section", 4, "ngIf"], [1, "q-feedback"], [1, "feedback-text"], [1, "q-review-comments"], [1, "review-columns"], [1, "col", "missed"], [1, "col-header"], [1, "dot", "red"], [1, "col", "incorrect"], [1, "dot", "orange"], [1, "col", "incomplete"], [1, "dot", "yellow"], [1, "review-item"], [1, "ri-body"], ["class", "review-text-history", 4, "ngIf"], ["class", "review-text-missed", 3, "deleted", 4, "ngIf"], ["class", "review-text-missed editing", 4, "ngIf"], [1, "review-meta", "small-muted"], ["class", "deleted-by", 4, "ngIf"], ["class", "review-actions", 4, "ngIf"], [1, "review-text-history"], [1, "history-entry"], [1, "review-text-missed"], [1, "ri-left"], [1, "ri-icon", "missed"], [1, "review-text"], [1, "review-text-missed", "editing"], ["rows", "2", 1, "edit-comment-text", 3, "ngModel", "ngModelChange"], [1, "deleted-by"], [1, "review-actions"], ["class", "edit-link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["class", "delete-link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["class", "save-link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["class", "cancel-link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 1, "edit-link", 3, "click"], ["href", "javascript:void(0)", 1, "delete-link", 3, "click"], ["href", "javascript:void(0)", 1, "save-link", 3, "click"], ["href", "javascript:void(0)", 1, "cancel-link", 3, "click"], ["class", "review-text-incorrect", 3, "deleted", 4, "ngIf"], ["class", "review-text-incorrect editing", 4, "ngIf"], [1, "review-text-incorrect"], [1, "ri-icon", "incorrect"], [1, "review-text-incorrect", "editing"], ["class", "review-text-incomplete", 3, "deleted", 4, "ngIf"], ["class", "review-text-incomplete editing", 4, "ngIf"], [1, "review-text-incomplete"], [1, "ri-icon", "incomplete"], [1, "review-text-incomplete", "editing"], [1, "marks-history-section"], [1, "marks-history-header"], [1, "marks-history-timeline"], ["class", "history-item current", 4, "ngIf"], ["class", "history-item", 4, "ngFor", "ngForOf"], [1, "history-item", "current"], [1, "history-indicator"], [1, "dot", "current"], ["class", "line", 4, "ngIf"], [1, "history-content"], [1, "history-card", "current"], [1, "history-badge"], [1, "history-marks"], [1, "marks-total"], [1, "history-meta"], [1, "updated-by"], [1, "updated-date"], [1, "line"], [1, "history-item"], [1, "dot", "past"], [1, "history-card", "past"], [1, "q-options", "two-col"], ["class", "q-option", 3, "correct", "selected", "missed", 4, "ngFor", "ngForOf"], [1, "q-option"], [1, "opt-left"], [1, "opt-mark"], [1, "opt-body"], [1, "opt-text"], ["class", "opt-badge", 4, "ngIf"], [1, "opt-badge"], ["class", "badge your-answer", 4, "ngIf"], ["class", "badge correct", 4, "ngIf"], ["class", "badge missed", 4, "ngIf"], [1, "badge", "your-answer"], [1, "badge", "correct"], [1, "badge", "missed"], [1, "wrong-summary-panel", 3, "click"], [1, "header-copy"], [1, "panel-sub"], [1, "question-title"], [1, "summary-table"], ["data-label", "Wrong Answer"], ["href", "javascript:void(0)", 1, "wa-answer-link", 3, "click"], ["data-label", "Selected Count"], ["href", "javascript:void(0)", 1, "wa-count-link", 3, "click"], ["data-label", "Occurrence %"], [1, "panel-sub", "small-muted"], ["mat-icon-button", "", "aria-label", "Close resources", "type", "button", 3, "click"], [1, "resource-list"], [1, "res-title"], [1, "res-desc", "small-muted"]],
      template: function ExamReportsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "mat-icon", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Institute");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-autocomplete", 6, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("optionSelected", function ExamReportsComponent_Template_mat_autocomplete_optionSelected_8_listener($event) {
            return ctx.onInstituteSelected($event.option.value);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, ExamReportsComponent_mat_option_10_Template, 2, 2, "mat-option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "mat-form-field", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "mat-icon", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Scheduled Tests");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "mat-autocomplete", 6, 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("optionSelected", function ExamReportsComponent_Template_mat_autocomplete_optionSelected_17_listener($event) {
            return ctx.onTestAutocompleteSelected($event.option.value);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, ExamReportsComponent_mat_option_19_Template, 3, 2, "mat-option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](20, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 13)(22, "div", 14)(23, "button", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_Template_button_click_23_listener() {
            return ctx.loadAnalytics();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](24, "mat-icon", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Refresh");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "button", 17, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_Template_button_click_26_listener($event) {
            $event.stopPropagation();
            return ctx.openFiltersOverlay();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "mat-icon", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Filter Test Reports");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](31, ExamReportsComponent_ng_template_31_Template, 63, 16, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 21)(34, "div", 22)(35, "mat-tab-group", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectedTabChange", function ExamReportsComponent_Template_mat_tab_group_selectedTabChange_35_listener($event) {
            return ctx.onTabChange($event);
          })("selectedIndexChange", function ExamReportsComponent_Template_mat_tab_group_selectedIndexChange_35_listener($event) {
            return ctx.activeMainTabIndex = $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "mat-tab", 24)(37, "div", 25)(38, "div", 26)(39, "div", 27)(40, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, "groups");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 28)(43, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "Students");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](46);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](48);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "div", 26)(50, "div", 32)(51, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52, "article");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "div", 28)(54, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](55, "Current Page");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, "Paginated user report results");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "div", 26)(61, "div", 33)(62, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "military_tech");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "div", 28)(65, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](66, "Average Score");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](68);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](69, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](70, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](71, "Average marks from loaded users");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "div", 26)(73, "div", 34)(74, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](75, "task_alt");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](76, "div", 28)(77, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](78, "Pass Rate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](79, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](80);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](81, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](82, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](83, "Success ratio in current view");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](84, "div", 35)(85, "div", 36)(86, "mat-form-field", 37)(87, "mat-icon", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](88, "search");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](89, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](90, "Search student");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](91, "input", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ExamReportsComponent_Template_input_ngModelChange_91_listener($event) {
            return ctx.searchQuery = $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](92, "div", 13)(93, "div", 14)(94, "button", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_Template_button_click_94_listener() {
            return ctx.loadUserReport(1);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](95, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](96, "search");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](97, " Search");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](98, "button", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ExamReportsComponent_Template_button_click_98_listener() {
            return ctx.exportUserCSV();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](99, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](100, "download");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](101, " Export CSV");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](102, ExamReportsComponent_div_102_Template, 26, 9, "div", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](103, ExamReportsComponent_div_103_Template, 2, 0, "div", 43);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](104, "mat-tab", 44)(105, "div", 45)(106, "div", 46)(107, "div", 26)(108, "div", 47)(109, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](110, "grid_view");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](111, "div", 28)(112, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](113, "Question Banks");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](114, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](115);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](116, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](117, "Performance groups in analytics");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](118, "div", 26)(119, "div", 48)(120, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](121, "quiz");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](122, "div", 28)(123, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](124, "Questions");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](125, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](126);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](127, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](128);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](129, "div", 26)(130, "div", 49)(131, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](132, "stacked_line_chart");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](133, "div", 28)(134, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](135, "Total Attempts");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](136, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](137);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](138, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](139, "Attempts recorded across categories");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](140, "div", 26)(141, "div", 50)(142, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](143, "warning_amber");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](144, "div", 28)(145, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](146, "Mistakes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](147, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](148);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](149, "div", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](150, "Wrong answers identified in analytics");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](151, "mat-tab-group", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectedIndexChange", function ExamReportsComponent_Template_mat_tab_group_selectedIndexChange_151_listener($event) {
            return ctx.innerAnalyticsTabIndex = $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](152, "mat-tab", 52)(153, "div", 45)(154, "div", 53)(155, "table", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](156, 55);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](157, ExamReportsComponent_th_157_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](158, ExamReportsComponent_td_158_Template, 6, 2, "td", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](159, 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](160, ExamReportsComponent_th_160_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](161, ExamReportsComponent_td_161_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](162, 60);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](163, ExamReportsComponent_th_163_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](164, ExamReportsComponent_td_164_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](165, 61);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](166, ExamReportsComponent_th_166_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](167, ExamReportsComponent_td_167_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](168, 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](169, ExamReportsComponent_th_169_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](170, ExamReportsComponent_td_170_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](171, 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](172, ExamReportsComponent_th_172_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](173, ExamReportsComponent_td_173_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](174, ExamReportsComponent_tr_174_Template, 1, 0, "tr", 64);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](175, ExamReportsComponent_tr_175_Template, 1, 0, "tr", 65);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](176, "mat-tab", 66)(177, "div", 45)(178, "div", 53)(179, "table", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](180, 67);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](181, ExamReportsComponent_th_181_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](182, ExamReportsComponent_td_182_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](183, 68);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](184, ExamReportsComponent_th_184_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](185, ExamReportsComponent_td_185_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](186, 69);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](187, ExamReportsComponent_th_187_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](188, ExamReportsComponent_td_188_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](189, 70);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](190, ExamReportsComponent_th_190_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](191, ExamReportsComponent_td_191_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](192, 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](193, ExamReportsComponent_th_193_Template, 2, 0, "th", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](194, ExamReportsComponent_td_194_Template, 2, 1, "td", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](195, ExamReportsComponent_tr_195_Template, 1, 0, "tr", 64);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](196, ExamReportsComponent_tr_196_Template, 1, 0, "tr", 65);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](197, ExamReportsComponent_div_197_Template, 24, 10, "div", 71);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](198, ExamReportsComponent_div_198_Template, 18, 1, "div", 71);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](199, ExamReportsComponent_div_199_Template, 22, 2, "div", 71);
        }
        if (rf & 2) {
          const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](9);
          const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formControl", ctx.instituteCtrl)("matAutocomplete", _r0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("displayWith", ctx.displayInstitute);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](11, 34, ctx.filteredInstitutes$));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formControl", ctx.examCtrl)("matAutocomplete", _r2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("displayWith", ctx.displayTest.bind(ctx));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](20, 36, ctx.filteredTests$));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("selectedIndex", ctx.activeMainTabIndex);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.userReportTotal || 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx.userReportData.length || 0, " visible for ", (ctx.selectedExam == null ? null : ctx.selectedExam.title) || (ctx.selectedExam == null ? null : ctx.selectedExam.name) || "selected test", "");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx.currentPage, "/", ctx.totalPages, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](69, 38, ctx.userAverageScore, "1.0-1"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](81, 41, ctx.userPassRate, "1.0-0"), "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.searchQuery);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.loadingUserReport);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loadingUserReport);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.categoryAnalytics.length || 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.activeQuestionCount || 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.filteredQuestionSummary.length ? "Filtered question summary view" : "Complete question summary view");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.analyticsTotalAttempts || 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.analyticsMistakeCount || 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("selectedIndex", ctx.innerAnalyticsTabIndex);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.categoryAnalytics);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](44, _c7));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](45, _c7));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.filteredQuestionSummary && ctx.filteredQuestionSummary.length ? ctx.filteredQuestionSummary : ctx.questionSummary);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](46, _c8));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](47, _c8));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showUserReviewPanel);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showWrongAnswerSummary);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showResourcePanel);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatSuffix, _angular_material_select__WEBPACK_IMPORTED_MODULE_15__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatIconButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInput, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_19__.MatRow, _angular_material_sort__WEBPACK_IMPORTED_MODULE_20__.MatSort, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_21__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_21__.MatTabGroup, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIcon, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__.MatAutocomplete, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__.MatAutocompleteTrigger, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__.MatDatepickerToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DecimalPipe],
      styles: ["[_nghost-%COMP%] {\n  --green-bg: #e8f9ef;\n  --red-bg: #fff2f4;\n  --yellow-bg: #fff8e6;\n  --orange-bg: #fff4e1;\n  --blue-bg: #e6f0ff;\n  --green-text: #166534;\n  --red-text: #b91c1c;\n  --yellow-text: #b45309;\n  --orange-text: #c2410c;\n  --blue-text: #0b66d0;\n  --bgreen-border: #86efac;\n  --bred-border: #e7d6d6;\n  --byellow-border: #fde68a;\n  --borange-border: #faeedf;\n  --bblue-border: #93c5fd;\n  --score-color: #f39c12;\n}\n\n[_nghost-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n.page[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem 3rem;\n}\n\n.exam-reports[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.125rem;\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.875rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.06);\n}\n\n.selections[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  flex: 1 1 28rem;\n  min-width: 16rem;\n  max-width: 36rem;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field {\n  position: relative;\n  min-width: 14rem;\n  max-width: 18rem;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-text-field-wrapper {\n  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  padding: 0 0.875rem;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mdc-notched-outline {\n  display: none !important;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-form-field-flex {\n  height: 2.75rem;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-form-field-infix {\n  padding: 0.5rem 0;\n  min-height: unset;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-floating-label {\n  top: 1.375rem;\n  font-size: 0.875rem;\n  color: #64748b;\n  font-weight: 500;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field.mat-focused .mat-mdc-floating-label, [_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-floating-label.mdc-floating-label--float-above {\n  transform: translateY(-1.5rem) scale(0.75);\n  color: var(--button-1);\n  font-weight: 600;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field input {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #0f172a;\n  letter-spacing: -0.01em;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field input::placeholder {\n  color: #94a3b8;\n  font-weight: 400;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field mat-icon[matPrefix] {\n  color: #94a3b8;\n  margin-right: 0.5rem;\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field:hover .mat-mdc-text-field-wrapper {\n  border-color: #cbd5e1;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field:hover mat-icon[matPrefix] {\n  color: #64748b;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field.mat-focused .mat-mdc-text-field-wrapper {\n  border-color: var(--button-1);\n  box-shadow: 0 0 0 3px rgba(31, 123, 255, 0.12), 0 4px 16px rgba(31, 123, 255, 0.08);\n  background: #ffffff;\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field.mat-focused mat-icon[matPrefix] {\n  color: var(--button-1);\n  transform: scale(1.05);\n}\n\n[_nghost-%COMP%]     .toolbar .selections mat-form-field .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel {\n  border-radius: 0.75rem !important;\n  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.03) !important;\n  border: none !important;\n  margin-top: 0.25rem;\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option {\n  padding: 0.625rem 1rem;\n  font-size: 0.875rem;\n  min-height: 2.75rem;\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option:hover {\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.04) 100%);\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option.mat-mdc-option-active {\n  background: linear-gradient(135deg, rgba(31, 123, 255, 0.1) 0%, rgba(31, 123, 255, 0.06) 100%);\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option .option-main {\n  font-weight: 500;\n  color: #0f172a;\n}\n\n[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option .option-sub {\n  font-size: 0.75rem;\n  color: #64748b;\n  margin-top: 0.125rem;\n}\n\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.action-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n\n.button-one[_ngcontent-%COMP%] {\n  background: var(--button-1) !important;\n  color: var(--button-text-1) !important;\n  border-radius: 0.5rem !important;\n  font-weight: 600 !important;\n  letter-spacing: 0.01em;\n  transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;\n}\n\n.button-one[_ngcontent-%COMP%]:hover {\n  background: var(--button-1-hover) !important;\n  color: var(--button-text-2) !important;\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06) !important;\n  transform: translateY(-0.0625rem);\n}\n\n.filters-panel[_ngcontent-%COMP%] {\n  width: 24rem;\n  max-height: 75vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 1rem;\n  box-shadow: 0 1.25rem 3rem rgba(15, 23, 42, 0.16), 0 0.375rem 1rem rgba(15, 23, 42, 0.06);\n  animation: _ngcontent-%COMP%_slideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.filters-panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.125rem;\n  border-bottom: 1px solid rgba(15, 23, 42, 0.06);\n  background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);\n  flex-shrink: 0;\n}\n\n.filters-panel-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  letter-spacing: -0.01em;\n}\n\n.filters-panel-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n  color: var(--button-1);\n}\n\n.filter-block[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n  padding: 1rem 1.125rem;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.filter-item[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-text-field-wrapper {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.625rem;\n  padding: 0 0.75rem;\n  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mdc-notched-outline {\n  display: none !important;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-form-field-flex {\n  height: 2.5rem;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-form-field-infix {\n  padding: 0.375rem 0;\n  min-height: unset;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-floating-label {\n  top: 1.25rem;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #64748b;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item.mat-focused .mat-mdc-floating-label, [_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-floating-label.mdc-floating-label--float-above {\n  color: var(--button-1);\n  font-weight: 600;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item input, [_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-select-value-text {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-select-arrow, [_nghost-%COMP%]     .filters-panel .filter-item .mat-datepicker-toggle .mat-icon {\n  color: #94a3b8;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item:hover .mat-mdc-text-field-wrapper {\n  border-color: #cbd5e1;\n  box-shadow: 0 0.25rem 0.625rem rgba(15, 23, 42, 0.06);\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item.mat-focused .mat-mdc-text-field-wrapper {\n  border-color: var(--button-1);\n  box-shadow: 0 0 0 3px rgba(31, 123, 255, 0.12);\n  background: #ffffff;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n[_nghost-%COMP%]     .filters-panel .filter-item .mat-datepicker-toggle button {\n  width: 1.75rem;\n  height: 1.75rem;\n  padding: 0;\n}\n\n.filter-item[_ngcontent-%COMP%]:nth-last-child(-n+2) {\n  grid-column: span 1;\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: flex-end;\n  padding: 0.875rem 1.125rem;\n  border-top: 1px solid rgba(15, 23, 42, 0.06);\n  background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);\n  flex-shrink: 0;\n}\n\n.filter-apply-btn[_ngcontent-%COMP%] {\n  background: var(--button-1) !important;\n  color: var(--button-text-1) !important;\n  border-radius: 0.5rem !important;\n  font-weight: 600 !important;\n  font-size: 0.8125rem !important;\n  padding: 0 1rem !important;\n  height: 2.25rem;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;\n}\n\n.filter-apply-btn[_ngcontent-%COMP%]:hover {\n  background: var(--button-1-hover) !important;\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06) !important;\n  transform: translateY(-0.0625rem);\n}\n\n.filter-reset-btn[_ngcontent-%COMP%] {\n  background: #ffffff !important;\n  color: #475569 !important;\n  border: 1px solid #e2e8f0 !important;\n  border-radius: 0.5rem !important;\n  font-weight: 600 !important;\n  font-size: 0.8125rem !important;\n  padding: 0 1rem !important;\n  height: 2.25rem;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.filter-reset-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc !important;\n  border-color: #cbd5e1 !important;\n}\n\n.filter-apply-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .filter-reset-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  margin-right: 0.25rem;\n}\n\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.list-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 0.0625rem solid #e2e8f0;\n  border-radius: 0.75rem;\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.list-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.08);\n  border-color: rgba(99, 102, 241, 0.15);\n}\n\n.list-wrapper[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.exam-tabs[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.inner-analytics-tabs[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .exam-tabs .mat-mdc-tab-header {\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n  border-bottom: 0.0625rem solid var(--theme-3-border);\n  padding: 0 0.5rem;\n}\n\n[_nghost-%COMP%]     .exam-tabs .mat-mdc-tab-labels {\n  min-height: 3rem;\n  gap: 0.125rem;\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab {\n  color: var(--theme-3-text-3);\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 0 1.25rem;\n  min-height: 3rem;\n  border-radius: 0.75rem 0.75rem 0 0;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  letter-spacing: 0.01em;\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab:hover {\n  background: var(--bg-1);\n  color: var(--theme-3-text-1);\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab--active {\n  background: var(--bg-1);\n  color: var(--button-1);\n  box-shadow: inset 0 -0.125rem 0 var(--button-1);\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab--active .mdc-tab__text-label {\n  color: var(--button-1);\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab__text-label {\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n[_nghost-%COMP%]     .exam-tabs .mat-mdc-tab-body-wrapper {\n  background: var(--bg-1);\n}\n\n[_nghost-%COMP%]     .exam-tabs .mdc-tab-indicator__content--underline {\n  border-color: var(--button-1);\n  border-width: 0.125rem;\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mat-mdc-tab-header {\n  background: var(--bg-1);\n  border-bottom: 0.0625rem solid var(--theme-3-border);\n  padding: 0 0.75rem;\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mat-mdc-tab-labels {\n  min-height: 2.625rem;\n  gap: 0.25rem;\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab {\n  color: var(--theme-3-text-3);\n  font-weight: 600;\n  font-size: 0.8125rem;\n  padding: 0 1rem;\n  min-height: 2.625rem;\n  border-radius: 0.5rem 0.5rem 0 0;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab:hover {\n  background: var(--bg-2);\n  color: var(--theme-3-text-1);\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab--active {\n  background: var(--bg-2);\n  color: var(--button-1);\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab--active .mdc-tab__text-label {\n  color: var(--button-1);\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab__text-label {\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n[_nghost-%COMP%]     .inner-analytics-tabs .mdc-tab-indicator__content--underline {\n  border-color: var(--button-1);\n  border-width: 0.125rem;\n}\n\n.report-summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.875rem;\n  padding: 1.25rem 1rem;\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  border-bottom: 1px solid var(--theme-3-border);\n}\n\n.analytics-summary-grid[_ngcontent-%COMP%] {\n  padding: 0.25rem 0 1rem;\n  background: transparent;\n  border-bottom: none;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.875rem;\n  min-width: 0;\n  padding: 1rem 1.125rem;\n  border: 1px solid var(--theme-3-border);\n  border-radius: 0.875rem;\n  background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  box-shadow: 0 0.25rem 0.75rem var(--theme-3-hanover-bg);\n  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-0.1875rem);\n  border-color: var(--button-1);\n  box-shadow: 0 0.75rem 1.5rem var(--theme-3-hanover-bg);\n}\n\n.summary-icon[_ngcontent-%COMP%] {\n  width: 2.75rem;\n  height: 2.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  border-radius: 0.875rem;\n  background: var(--theme-2-hanover-bg);\n  color: var(--button-1);\n  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.summary-icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n\n.summary-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n.summary-icon--students[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.1);\n  color: #6366f1;\n}\n\n.summary-icon--page[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n\n.summary-icon--score[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.1);\n  color: #f59e0b;\n}\n\n.summary-icon--pass[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.1);\n  color: #10b981;\n}\n\n.summary-icon--categories[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.1);\n  color: #8b5cf6;\n}\n\n.summary-icon--questions[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n\n.summary-icon--attempts[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.1);\n  color: #6366f1;\n}\n\n.summary-icon--mistakes[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n\n.summary-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  min-width: 0;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  font-size: var(--font-xs);\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--theme-3-text-3);\n}\n\n.summary-value[_ngcontent-%COMP%] {\n  font-size: clamp(1.25rem, 1.05rem + 0.7vw, 1.75rem);\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: -0.03em;\n  color: var(--theme-3-text-1);\n}\n\n.summary-meta[_ngcontent-%COMP%] {\n  font-size: var(--font-xsm);\n  font-weight: 500;\n  color: var(--theme-3-text-2);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.tab-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.875rem 1rem 1rem;\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n  border-bottom: 1px solid var(--theme-3-border);\n  margin: 0;\n}\n\n.tab-actions[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 20rem;\n}\n\n[_nghost-%COMP%]     .tab-actions .search mat-form-field {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-mdc-text-field-wrapper {\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  border: 1px solid var(--theme-3-border);\n  border-radius: 0.75rem;\n  padding: 0 0.75rem;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 0.5rem 1rem var(--theme-3-hanover-bg);\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mdc-notched-outline {\n  display: none !important;\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-mdc-form-field-flex {\n  height: 2.375rem;\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-mdc-form-field-infix {\n  padding: 0.375rem 0;\n  min-height: unset;\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-mdc-floating-label {\n  top: 1.1875rem;\n  font-size: 0.8125rem;\n  color: var(--theme-3-text-3);\n}\n\n[_nghost-%COMP%]     .tab-actions .search input {\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: var(--theme-3-text-1);\n}\n\n[_nghost-%COMP%]     .tab-actions .search input::placeholder {\n  color: var(--theme-3-text-3);\n}\n\n[_nghost-%COMP%]     .tab-actions .search mat-icon[matPrefix] {\n  color: var(--theme-3-icon-1);\n  margin-right: 0.5rem;\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]:hover     .mat-mdc-text-field-wrapper {\n  border-color: var(--button-1);\n  box-shadow: 0 0.75rem 1.5rem var(--theme-3-hanover-bg);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]:hover     mat-icon[matPrefix] {\n  color: var(--button-1);\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-focused .mat-mdc-text-field-wrapper, [_nghost-%COMP%]     .tab-actions .search mat-form-field.mat-focused .mat-mdc-text-field-wrapper {\n  border-color: var(--button-1);\n  box-shadow: 0 0 0 3px var(--theme-2-hanover-bg);\n  background: var(--bg-1);\n}\n\n[_nghost-%COMP%]     .tab-actions .search mat-form-field.mat-focused mat-icon[matPrefix] {\n  color: var(--button-1);\n}\n\n[_nghost-%COMP%]     .tab-actions .search .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n\n.tab-actions[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.375rem;\n  align-items: center;\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 2.25rem;\n  padding: 0 0.875rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  letter-spacing: -0.01em;\n  border-radius: 0.625rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-stroked-button][_ngcontent-%COMP%], .tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  color: var(--theme-3-text-2);\n  border: 1px solid var(--theme-3-border);\n  box-shadow: 0 0.5rem 1rem var(--theme-3-hanover-bg);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-stroked-button][_ngcontent-%COMP%]:hover, .tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-button][_ngcontent-%COMP%]:hover {\n  background: var(--bg-1);\n  border-color: var(--button-1);\n  color: var(--button-1);\n  box-shadow: 0 0.75rem 1.5rem var(--theme-2-hanover-bg);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--button-1) 0%, var(--button-1-hover) 100%);\n  color: var(--button-text-1);\n  border: none;\n  box-shadow: 0 0.75rem 1.5rem var(--theme-2-hanover-bg);\n}\n\n.tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]:hover {\n  background: linear-gradient(135deg, var(--button-1-hover) 0%, var(--button-1) 100%);\n  box-shadow: 0 1rem 2rem var(--theme-2-hanover-bg);\n}\n\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 1rem 1rem;\n}\n\n.premium-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n\n.premium-table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: var(--table-header-bg, #f8fafc);\n  font-weight: 700;\n  font-size: 0.8125rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--table-header-text, #475569);\n  padding: 0.75rem 0.875rem;\n  border-bottom: 0.125rem solid #e2e8f0;\n  white-space: nowrap;\n}\n\n.premium-table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]:first-child {\n  border-left: 0.1875rem solid var(--button-1);\n}\n\n.premium-table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%] {\n  padding: 0.625rem 0.875rem;\n  font-size: 0.8125rem;\n  color: var(--theme-3-text-2, #334155);\n  border-bottom: 0.0625rem solid #f1f5f9;\n  vertical-align: middle;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.premium-table[_ngcontent-%COMP%]   tr.mat-row[_ngcontent-%COMP%]:nth-child(even)   td[_ngcontent-%COMP%] {\n  background: rgba(248, 250, 252, 0.5);\n}\n\n.premium-table[_ngcontent-%COMP%]   tr.mat-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.045);\n  box-shadow: inset 0.1875rem 0 0 var(--button-1);\n}\n\n.student-name[_ngcontent-%COMP%] {\n  color: var(--button-1);\n  cursor: pointer;\n  font-weight: 600;\n  font-size: var(--font-md);\n  letter-spacing: -0.01em;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n  display: inline-block;\n}\n\n.student-name[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n  text-decoration: underline;\n  text-underline-offset: 0.125rem;\n  transform: translateX(0.0625rem);\n}\n\n.student-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  cursor: pointer;\n}\n\n.student-avatar[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  color: #fff;\n  flex-shrink: 0;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.category-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  cursor: pointer;\n}\n\n.category-avatar[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  color: #fff;\n  flex-shrink: 0;\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n}\n\n.marks-inline[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: var(--theme-3-text-1);\n}\n\n.marks-sep[_ngcontent-%COMP%] {\n  color: var(--theme-3-text-3);\n  margin: 0 0.125rem;\n}\n\n.pct-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.1875rem 0.5rem;\n  border-radius: 0.375rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  background: rgba(99, 102, 241, 0.08);\n  color: #6366f1;\n}\n\n.review-status[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 500;\n}\n\n.review-status.review-pending[_ngcontent-%COMP%] {\n  color: var(--orange-text);\n  font-weight: 600;\n}\n\n.result-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.1875rem 0.625rem;\n  border-radius: 1rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  background: rgba(0, 0, 0, 0.04);\n  color: var(--theme-3-text-3);\n}\n\n.result-pill.result-pass[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  color: var(--green-text);\n  border: 0.0625rem solid var(--bgreen-border);\n}\n\n.result-pill.result-fail[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  color: var(--red-text);\n  border: 0.0625rem solid var(--bred-border);\n}\n\n.table-wrap[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(99, 102, 241, 0.2) transparent;\n}\n.table-wrap[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 0.375rem;\n}\n.table-wrap[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.table-wrap[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(99, 102, 241, 0.2);\n  border-radius: 0.1875rem;\n}\n.table-wrap[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(99, 102, 241, 0.35);\n}\n\n.analytics-section[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.125rem;\n}\n\n.analytics-section[_ngcontent-%COMP%]   .table-wrap[_ngcontent-%COMP%] {\n  max-height: 60vh;\n  overflow: auto;\n  border-radius: 0.625rem;\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n  border: 0.0625rem solid var(--theme-3-border);\n}\n\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 0.875rem 1.25rem;\n  border-top: 0.0625rem solid var(--theme-3-border);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n  color: var(--theme-3-text-2);\n}\n\n.pager[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 0.375rem;\n  background: var(--bg-1);\n  border: 0.0625rem solid var(--theme-3-border);\n}\n\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border-radius: 0.5rem !important;\n  font-weight: 600 !important;\n  padding: 0.375rem 1rem !important;\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;\n}\n\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not([disabled]):hover {\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06) !important;\n  transform: translateY(-0.0625rem);\n  background: var(--bg-2) !important;\n}\n\n.pager[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n.loader-placeholder[_ngcontent-%COMP%] {\n  padding: 2.5rem;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 0.875rem;\n  letter-spacing: 0.01em;\n  background: linear-gradient(90deg, rgba(0, 0, 0, 0.02) 25%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: 0.5rem;\n  margin: 1rem;\n}\n\n.wrong-summary-link[_ngcontent-%COMP%] {\n  margin-left: 0.375rem;\n  font-size: 0.85rem;\n  color: var(--button-1);\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 0.125rem;\n  font-weight: 600;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n  display: inline-block;\n}\n\n.wrong-summary-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n  transform: translateX(0.125rem);\n}\n\n.wa-count-link[_ngcontent-%COMP%] {\n  color: var(--button-1);\n  text-decoration: underline;\n  text-underline-offset: 0.125rem;\n  cursor: pointer;\n  font-weight: 700;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.wa-count-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.wa-answer-link[_ngcontent-%COMP%] {\n  color: var(--button-1);\n  font-weight: 700;\n  text-decoration: none;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n  display: inline-block;\n}\n\n.wa-answer-link[_ngcontent-%COMP%]:hover {\n  transform: translateX(0.0625rem);\n}\n\n.muted[_ngcontent-%COMP%] {\n  color: var(--theme-3-text-3);\n  font-size: 0.85rem;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(1.25rem) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_subtlePulse {\n  0%, 100% {\n    box-shadow: 0 1.5rem 3.75rem var(--theme-3-hanover-bg);\n  }\n  50% {\n    box-shadow: 0 1.75rem 4rem var(--theme-2-hanover-bg);\n  }\n}\n.wrong-summary-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.55) 0%, rgba(30, 41, 59, 0.75) 100%);\n  backdrop-filter: blur(0.75rem) saturate(140%);\n  z-index: 10050;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.5rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%], .resource-panel[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(56rem, 92vw);\n  max-height: 88vh;\n  z-index: 10060;\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n  margin: auto;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%], .resource-panel[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 88vh;\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  border: 0.0625rem solid var(--theme-3-border);\n  border-radius: 1.25rem;\n  box-shadow: 0 2rem 4.5rem rgba(15, 23, 42, 0.28), 0 0.75rem 1.5rem rgba(15, 23, 42, 0.12);\n  overflow: hidden;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 0.0625rem solid var(--theme-3-border);\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n  flex-shrink: 0;\n}\n\n.panel-header[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 0.1875rem;\n  background: linear-gradient(180deg, var(--button-1), transparent);\n  border-radius: 0 0.1875rem 0.1875rem 0;\n}\n\n.panel-header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  min-width: 0;\n  flex: 1;\n}\n\n.panel-header[_ngcontent-%COMP%]   .header-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1875rem;\n  min-width: 0;\n}\n\n.panel-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  border-radius: 0.875rem;\n  background: linear-gradient(135deg, var(--theme-2-hanover-bg) 0%, var(--bg-1) 100%);\n  color: var(--button-1);\n  box-shadow: 0 0.5rem 1.25rem var(--theme-3-hanover-bg), inset 0 0 0 0.0625rem var(--theme-3-border);\n}\n\n.panel-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  width: 1.375rem;\n  height: 1.375rem;\n}\n\n.panel-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  color: var(--theme-3-text-1);\n}\n\n.panel-header[_ngcontent-%COMP%]   .panel-sub[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--theme-3-text-3);\n  margin-top: 0;\n  line-height: 1.4;\n}\n\n.panel-header[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.75rem;\n  background: var(--bg-1);\n  border: 0.0625rem solid var(--theme-3-border);\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  flex-shrink: 0;\n}\n\n.panel-header[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]:hover {\n  background: var(--theme-2-hanover-bg);\n  border-color: var(--button-1);\n  color: var(--button-1);\n  transform: rotate(90deg);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%] {\n  padding: 1.125rem 1.375rem;\n  overflow: auto;\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .question-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 0.875rem;\n  font-size: 0.9375rem;\n  letter-spacing: -0.01em;\n  color: var(--theme-3-text-1);\n  padding: 0.875rem 1rem;\n  border: 0.0625rem solid var(--theme-3-border);\n  border-radius: 0.875rem;\n  background: var(--bg-1);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .small-muted[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  padding-left: 0;\n  color: var(--theme-3-text-3);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 0.5rem;\n  margin: 0 auto;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 0.75rem 1rem;\n  font-weight: 700;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--theme-1-text-1);\n  background: var(--table-header-bg);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 0.625rem 0 0 0.625rem;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 0.625rem 0.625rem 0;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: transparent;\n  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-0.125rem);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  vertical-align: middle;\n  text-align: center;\n  background: var(--bg-1);\n  border: 0.0625rem solid var(--theme-3-border);\n  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  border-radius: 0.625rem 0 0 0.625rem;\n  text-align: left;\n  font-weight: 600;\n  color: var(--theme-3-text-1);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 0.625rem 0.625rem 0;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  border-color: var(--button-1);\n  background: var(--bg-2);\n  box-shadow: 0 0.5rem 1.25rem var(--theme-3-hanover-bg);\n}\n\n.wa-answer-link[_ngcontent-%COMP%], .wa-count-link[_ngcontent-%COMP%] {\n  color: var(--button-1);\n  font-weight: 600;\n  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.wa-answer-link[_ngcontent-%COMP%]:hover, .wa-count-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n  text-decoration: underline;\n  text-underline-offset: 0.125rem;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .summary-actions[_ngcontent-%COMP%], .summary-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.875rem 1.375rem;\n  border-top: 0.0625rem solid var(--theme-3-border);\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n}\n\n.summary-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border-radius: 0.625rem !important;\n  font-weight: 700 !important;\n  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.summary-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-0.0625rem);\n  box-shadow: 0 0.75rem 1.5rem var(--theme-3-hanover-bg) !important;\n}\n\n.resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .resource-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.resource-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.resource-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  border-radius: 0.875rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n  border: 0.0625rem solid var(--theme-3-border);\n  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.resource-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 1rem 2rem var(--theme-3-hanover-bg);\n  transform: translateY(-0.125rem);\n  border-color: var(--button-1);\n}\n\n.res-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--theme-3-text-1);\n  letter-spacing: -0.01em;\n}\n\n.res-desc[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--theme-3-text-3);\n}\n\n.res-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  background: var(--button-1);\n  color: var(--button-text-1);\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.375rem;\n  text-decoration: none;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.res-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%], .resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%], .user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar, .resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar, .user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 0.375rem;\n  width: 0.375rem;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-track, .resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-track, .user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, .resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, .user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--theme-3-border);\n  border-radius: 0.1875rem;\n}\n\n.wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, .resource-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, .user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--theme-3-text-3);\n}\n\n.user-review-panel[_ngcontent-%COMP%] {\n  width: min(72rem, 94vw);\n  max-height: 90vh;\n  margin: auto;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  border-radius: 1.25rem;\n  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);\n  box-shadow: 0 2rem 4.5rem rgba(15, 23, 42, 0.28), 0 0.75rem 1.5rem rgba(15, 23, 42, 0.12);\n  border: 0.0625rem solid var(--theme-3-border);\n  overflow: hidden;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 0.0625rem solid var(--theme-3-border);\n  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%);\n  flex-shrink: 0;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 0.1875rem;\n  background: linear-gradient(180deg, var(--button-1), transparent);\n  border-radius: 0 0.1875rem 0.1875rem 0;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.875rem;\n  background: linear-gradient(135deg, var(--theme-2-hanover-bg) 0%, var(--bg-1) 100%);\n  color: var(--button-1);\n  box-shadow: 0 0.5rem 1.25rem var(--theme-3-hanover-bg), inset 0 0 0 0.0625rem var(--theme-3-border);\n  flex-shrink: 0;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  width: 1.375rem;\n  height: 1.375rem;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  color: var(--theme-3-text-1);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: var(--theme-3-text-3);\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .score[_ngcontent-%COMP%] {\n  color: var(--theme-3-text-2);\n  font-weight: 600;\n  padding: 0.25rem 0.625rem;\n  border-radius: 0.5rem;\n  background: var(--bg-1);\n  border: 0.0625rem solid var(--theme-3-border);\n  font-size: 0.8125rem;\n  letter-spacing: 0.01em;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%] {\n  font-weight: 700;\n  padding: 0.25rem 0.75rem;\n  border-radius: 62.5rem;\n  font-size: 0.75rem;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  box-shadow: 0 0.125rem 0.5rem rgba(15, 23, 42, 0.08);\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .result.pass[_ngcontent-%COMP%] {\n  color: var(--button-text-1);\n  background: var(--button-1);\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   .result.fail[_ngcontent-%COMP%] {\n  color: #fff;\n  background: var(--theme-3-text-3);\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.75rem;\n  background: var(--bg-1);\n  border: 0.0625rem solid var(--theme-3-border);\n  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  flex-shrink: 0;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-header[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%]:hover {\n  background: var(--theme-2-hanover-bg);\n  border-color: var(--button-1);\n  color: var(--button-1);\n  transform: rotate(90deg);\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-sub[_ngcontent-%COMP%] {\n  color: var(--theme-3-text-3);\n  font-size: 0.875rem;\n}\n\n.user-review-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  max-height: calc(90vh - 10rem);\n  padding: 1.5rem;\n}\n\n.attempt-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n  padding: 0.75rem 0;\n  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.06);\n  margin-bottom: 0.875rem;\n}\n\n.attempt-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n}\n\n.attempt-header[_ngcontent-%COMP%]   .score-badge[_ngcontent-%COMP%] {\n  background: #e9f7ef;\n  color: #0a8043;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.75rem;\n  font-weight: 700;\n  font-size: 0.875rem;\n  margin-left: auto;\n  letter-spacing: 0.01em;\n}\n\n.attempt-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  color: rgba(0, 0, 0, 0.55);\n  font-size: 0.8125rem;\n}\n\n.questions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 0.5rem;\n}\n\n.question-review-card[_ngcontent-%COMP%] {\n  position: relative;\n  border: 0.0625rem solid var(--theme-3-border);\n  border-radius: 0.875rem;\n  padding: 1.25rem 1.5rem;\n  background: var(--bg-1);\n  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 0.125rem 0.375rem rgba(15, 23, 42, 0.03);\n  overflow: hidden;\n}\n\n.question-review-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 0.1875rem;\n  background: linear-gradient(180deg, var(--button-1) 0%, rgba(99, 102, 241, 0.4) 100%);\n}\n\n.question-review-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.75rem 1.75rem rgba(15, 23, 42, 0.08);\n  transform: translateY(-0.125rem);\n  border-color: rgba(99, 102, 241, 0.25);\n}\n\n.question-review-card[_ngcontent-%COMP%]   .q-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n  line-height: 1.55;\n  color: var(--theme-3-text-1);\n}\n\n.question-review-card[_ngcontent-%COMP%]   .mark-badge[_ngcontent-%COMP%] {\n  float: right;\n  background: #fff3f3;\n  color: var(--red-text);\n  padding: 0.375rem 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n}\n\n.q-head-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 0.0625rem dashed var(--theme-3-border);\n}\n\n.q-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.875rem;\n  align-items: flex-start;\n  flex: 1;\n  min-width: 0;\n}\n\n.q-body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.q-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.q-index[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0.06) 100%);\n  border: 0.0625rem solid rgba(99, 102, 241, 0.18);\n  border-radius: 0.625rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 800;\n  font-size: 0.875rem;\n  color: var(--button-1);\n  flex-shrink: 0;\n}\n\n.q-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.625rem;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.q-badge[_ngcontent-%COMP%] {\n  background: var(--theme-2-hanover-bg);\n  border: 0.0625rem solid var(--theme-3-border);\n  color: var(--button-1);\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.625rem;\n  font-size: 0.6875rem;\n  line-height: 1rem;\n  width: -moz-fit-content;\n  width: fit-content;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.q-info[_ngcontent-%COMP%] {\n  color: var(--theme-3-text-3);\n  font-size: 0.8125rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  font-weight: 500;\n}\n\n.q-info[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  width: 0.9375rem;\n  height: 0.9375rem;\n  color: var(--button-1);\n}\n\n.q-marks.small-muted[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 0.875rem;\n}\n\n.q-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.625rem;\n}\n\n.q-options.two-col[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n\n.q-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.875rem;\n  border-radius: 0.5rem;\n  border: 0.0625rem solid rgba(0, 0, 0, 0.1);\n  background: #f8fbff;\n  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.q-option[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06);\n  transform: translateY(-0.125rem);\n  border-color: rgba(99, 102, 241, 0.15);\n}\n\n.opt-left[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.opt-left[_ngcontent-%COMP%]   .opt-mark[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.05);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.opt-body[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-right: 0.75rem;\n  align-self: center;\n  line-height: 1.45;\n}\n\n.opt-badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.625rem;\n  border-radius: 1rem;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  white-space: nowrap;\n  letter-spacing: 0.02em;\n}\n\n.badge.your-answer[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  color: var(--red-text);\n  border: 0.0625rem solid var(--bred-border);\n}\n\n.badge.correct[_ngcontent-%COMP%] {\n  background: #e8f9ef;\n  color: var(--green-text);\n  border: 0.0625rem solid var(--bgreen-border);\n}\n\n.badge.missed[_ngcontent-%COMP%] {\n  background: var(--blue-bg);\n  color: var(--bblue-text);\n  border: 0.0625rem solid var(--bblue-border);\n}\n\n.q-option.selected[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  color: var(--red-text);\n  border-color: var(--bred-border);\n}\n\n.q-option.selected[_ngcontent-%COMP%]   .opt-mark[_ngcontent-%COMP%] {\n  background: rgba(185, 28, 28, 0.1);\n}\n\n.q-option.correct[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  color: var(--green-text);\n  border-color: var(--bgreen-border);\n}\n\n.q-option.correct[_ngcontent-%COMP%]   .opt-mark[_ngcontent-%COMP%] {\n  background: rgba(22, 101, 52, 0.1);\n}\n\n.q-option.missed[_ngcontent-%COMP%] {\n  background: var(--blue-bg);\n  color: var(--bblue-text);\n  border-color: var(--bblue-border);\n}\n\n.q-option.missed[_ngcontent-%COMP%]   .opt-mark[_ngcontent-%COMP%] {\n  background: rgba(11, 102, 208, 0.1);\n}\n\n.q-selected[_ngcontent-%COMP%], .q-marks[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n}\n\n.q-feedback[_ngcontent-%COMP%] {\n  margin-top: 0.625rem;\n  background: rgba(240, 248, 255, 0.6);\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  color: rgba(0, 0, 0, 0.75);\n  border-left: 0.1875rem solid var(--bblue-border);\n  line-height: 1.5;\n}\n\n.q-marks.mark-positive[_ngcontent-%COMP%] {\n  background: #e8f9ef;\n  color: #0b8a45;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  letter-spacing: 0.01em;\n}\n\n.q-marks.mark-negative[_ngcontent-%COMP%] {\n  background: #fff2f4;\n  color: #b02a37;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  letter-spacing: 0.01em;\n}\n\n.q-marks.mark-mid[_ngcontent-%COMP%] {\n  background: #fff8e6;\n  color: #b36a00;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-weight: 700;\n  font-size: 0.8125rem;\n  letter-spacing: 0.01em;\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-option[_ngcontent-%COMP%] {\n  padding: 0.625rem 0.875rem;\n  border-radius: 0.5rem;\n  background: #fff7ed;\n  border: 0.0625rem solid rgba(245, 166, 35, 0.1);\n  transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-option[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-option.selected[_ngcontent-%COMP%] {\n  background: #e8f6ff;\n  border-color: rgba(2, 112, 255, 0.15);\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-option.correct[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  border-color: var(--bgreen-border);\n}\n\n.q-fill[_ngcontent-%COMP%]   .fill-correct[_ngcontent-%COMP%] {\n  padding: 0.625rem 0.875rem;\n  border-radius: 0.5rem;\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 0.8125rem;\n  background-color: var(--green-bg);\n  border: 0.0625rem solid var(--bgreen-border);\n}\n\n.q-descriptive[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.875rem;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 0.625rem;\n  padding: 0.75rem;\n  background-color: var(--blue-bg);\n  border-radius: 0.625rem;\n  border: 0.0625rem solid var(--bblue-border);\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .desc-question[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .question-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #8c6ad6;\n  background: rgba(140, 106, 214, 0.08);\n  display: inline-block;\n  padding: 0.375rem 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 700;\n  margin-bottom: 0.375rem;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .question-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .desc-score[_ngcontent-%COMP%] {\n  width: 8.75rem;\n  flex: 0 0 8.75rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .score-label[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: rgba(0, 0, 0, 0.55);\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .score-value[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 800;\n  color: #f39c12;\n  background: #fff;\n  padding: 0.75rem 0.5rem;\n  border-radius: 0.625rem;\n  border: 0.0625rem solid rgba(0, 0, 0, 0.04);\n  margin-top: 0.375rem;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-model[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  background-color: var(--theme-2);\n  border-radius: 0.625rem;\n  border: 0.0625rem solid var(--bblue-border);\n  border-left: 0.1875rem solid var(--bblue-border);\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-student[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  background-color: var(--green-bg);\n  border-radius: 0.625rem;\n  border: 0.0625rem solid var(--bgreen-border);\n  border-left: 0.1875rem solid var(--bgreen-border);\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-model[_ngcontent-%COMP%]   .model-label[_ngcontent-%COMP%], .q-descriptive[_ngcontent-%COMP%]   .desc-student[_ngcontent-%COMP%]   .student-label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: rgba(0, 0, 0, 0.7);\n  margin-bottom: 0.375rem;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-model[_ngcontent-%COMP%]   .model-text[_ngcontent-%COMP%], .q-descriptive[_ngcontent-%COMP%]   .desc-student[_ngcontent-%COMP%]   .answer-text[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.85);\n  line-height: 1.55;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .desc-score[_ngcontent-%COMP%] {\n  width: 8.75rem;\n  background: #fff;\n  border: 0.0625rem solid rgba(0, 0, 0, 0.04);\n  padding: 0.625rem;\n  border-radius: 0.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .score-label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 0.375rem;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .score-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n  color: #0b66d0;\n}\n\n.q-descriptive[_ngcontent-%COMP%]   .q-feedback[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  background-color: var(--blue-bg);\n  border-radius: 0.625rem;\n  border: 0.0625rem solid var(--bblue-border);\n  border-left: 0.1875rem solid var(--bblue-border);\n  line-height: 1.5;\n}\n\n.q-review-comments[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 0.0625rem dashed var(--theme-3-border);\n}\n\n.review-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 0.875rem;\n}\n\n.review-columns[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 0.0625rem solid rgba(0, 0, 0, 0.06);\n  padding: 0.875rem;\n  border-radius: 0.75rem;\n  min-height: 4rem;\n  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.review-columns[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1.25rem rgba(15, 23, 42, 0.06);\n  transform: translateY(-0.125rem);\n}\n\n.review-columns[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 0.875rem;\n}\n\n.review-columns[_ngcontent-%COMP%]   .col.missed[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--red-bg) 0%, #fff 90%);\n  border-color: var(--bred-border);\n  border-top: 0.1875rem solid var(--red-text);\n}\n\n.review-columns[_ngcontent-%COMP%]   .col.incorrect[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--orange-bg) 0%, #fff 90%);\n  border-color: var(--borange-border);\n  border-top: 0.1875rem solid var(--orange-text);\n}\n\n.review-columns[_ngcontent-%COMP%]   .col.incomplete[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--yellow-bg) 0%, #fff 90%);\n  border-color: var(--byellow-border);\n  border-top: 0.1875rem solid var(--yellow-text);\n}\n\n.col-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.75rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.06);\n}\n\n.col-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: var(--theme-3-text-2);\n}\n\n.dot[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  display: inline-block;\n  flex-shrink: 0;\n  box-shadow: 0 0 0 0.1875rem rgba(0, 0, 0, 0.04);\n}\n\n.dot.red[_ngcontent-%COMP%] {\n  background: var(--red-text);\n}\n\n.dot.orange[_ngcontent-%COMP%] {\n  background: var(--orange-text);\n}\n\n.dot.yellow[_ngcontent-%COMP%] {\n  background: var(--yellow-text);\n}\n\n.review-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.625rem;\n  align-items: flex-start;\n}\n\n.ri-left[_ngcontent-%COMP%] {\n  width: 2rem;\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  flex-shrink: 0;\n}\n\n.ri-icon[_ngcontent-%COMP%] {\n  width: 1.625rem;\n  height: 1.625rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n\n.ri-icon.missed[_ngcontent-%COMP%] {\n  color: var(--red-text);\n  background: rgba(185, 28, 28, 0.08);\n}\n\n.ri-icon.incorrect[_ngcontent-%COMP%] {\n  color: var(--orange-text);\n  background: rgba(194, 65, 12, 0.08);\n}\n\n.ri-icon.incomplete[_ngcontent-%COMP%] {\n  color: var(--yellow-text);\n  background: rgba(180, 83, 9, 0.08);\n}\n\n.ri-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.review-text.deleted[_ngcontent-%COMP%] {\n  color: gray;\n  text-decoration: line-through;\n}\n\n.deleted-by[_ngcontent-%COMP%] {\n  color: #c0392b;\n  font-style: italic;\n  display: block;\n  margin-top: 0.375rem;\n  font-size: 0.75rem;\n}\n\n.review-text-missed[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--theme-3);\n  font-weight: 400;\n  padding: 0.625rem 0.75rem;\n  border: 0.0625rem solid var(--bred-border);\n  border-radius: 0.5rem;\n  line-height: 1.45;\n  transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.review-text-missed[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n}\n\n.review-text-incorrect[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--theme-3);\n  font-weight: 400;\n  padding: 0.625rem 0.75rem;\n  border: 0.0625rem solid var(--borange-border);\n  border-radius: 0.5rem;\n  line-height: 1.45;\n  transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.review-text-incorrect[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n}\n\n.review-text-incomplete[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--theme-3);\n  font-weight: 400;\n  padding: 0.625rem 0.75rem;\n  border: 0.0625rem solid var(--byellow-border);\n  border-radius: 0.5rem;\n  line-height: 1.45;\n  transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.review-text-incomplete[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.04), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);\n}\n\n.review-meta[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  color: rgba(0, 0, 0, 0.5);\n  margin-top: 0.375rem;\n  letter-spacing: 0.01em;\n}\n\n.review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.125rem;\n}\n\n.review-actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: initial !important;\n}\n\n.review-actions[_ngcontent-%COMP%]   .edit-link[_ngcontent-%COMP%], .review-actions[_ngcontent-%COMP%]   .delete-link[_ngcontent-%COMP%], .save-link[_ngcontent-%COMP%], .cancel-link[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.375rem;\n  text-decoration: none;\n  margin-right: 0.375rem;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.1875rem;\n  font-size: 0.8125rem;\n  transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.review-actions[_ngcontent-%COMP%]   .edit-link[_ngcontent-%COMP%]:hover, .save-link[_ngcontent-%COMP%]:hover {\n  background: rgba(99, 102, 241, 0.06);\n}\n\n.review-actions[_ngcontent-%COMP%]   .delete-link[_ngcontent-%COMP%] {\n  color: #d33;\n}\n\n.review-actions[_ngcontent-%COMP%]   .delete-link[_ngcontent-%COMP%]:hover {\n  background: rgba(221, 51, 51, 0.06);\n}\n\n.cancel-link[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.edit-comment-text[_ngcontent-%COMP%] {\n  width: -webkit-fill-available;\n  border: 0.0625rem solid var(--border-1);\n  border-radius: 0.375rem;\n  padding: 0.375rem 0.5rem;\n  font-size: 0.8125rem;\n  line-height: 1.45;\n  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  resize: vertical;\n}\n\n.edit-comment-text[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--button-1);\n  box-shadow: 0 0 0 0.125rem rgba(99, 102, 241, 0.1);\n}\n\n.marks-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n}\n\n.marks-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n}\n\n.edit-marks-btn[_ngcontent-%COMP%] {\n  width: 1.75rem !important;\n  height: 1.75rem !important;\n  line-height: 1.75rem !important;\n  opacity: 0.6;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.edit-marks-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n.edit-marks-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  background: rgba(99, 102, 241, 0.08);\n}\n\n.marks-edit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  background: #fff;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.5rem;\n  border: 0.0625rem solid var(--button-1);\n  box-shadow: 0 0.125rem 0.5rem rgba(99, 102, 241, 0.15);\n}\n\n.marks-input[_ngcontent-%COMP%] {\n  width: 3.5rem;\n  padding: 0.25rem 0.375rem;\n  border: 0.0625rem solid var(--border-1);\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  text-align: center;\n  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.marks-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--button-1);\n  box-shadow: 0 0 0 0.125rem rgba(99, 102, 241, 0.1);\n}\n.marks-input[_ngcontent-%COMP%]::-webkit-inner-spin-button, .marks-input[_ngcontent-%COMP%]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.marks-max[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: rgba(0, 0, 0, 0.55);\n  font-weight: 500;\n}\n\n.save-marks-btn[_ngcontent-%COMP%] {\n  width: 1.75rem !important;\n  height: 1.75rem !important;\n  line-height: 1.75rem !important;\n  color: var(--green-text) !important;\n  background: var(--green-bg) !important;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.save-marks-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n.save-marks-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.cancel-marks-btn[_ngcontent-%COMP%] {\n  width: 1.75rem !important;\n  height: 1.75rem !important;\n  line-height: 1.75rem !important;\n  color: var(--red-text) !important;\n  background: var(--red-bg) !important;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.cancel-marks-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n.cancel-marks-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.marks-history-section[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(59, 130, 246, 0.02) 100%);\n  border-radius: 0.75rem;\n  border: 0.0625rem solid rgba(99, 102, 241, 0.1);\n}\n\n.marks-history-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.875rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 0.0625rem solid rgba(99, 102, 241, 0.1);\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: var(--button-1);\n}\n.marks-history-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n}\n\n.marks-history-timeline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.history-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.875rem;\n  position: relative;\n}\n\n.history-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 1.5rem;\n  flex-shrink: 0;\n}\n.history-indicator[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 0.75rem;\n  height: 0.75rem;\n  border-radius: 50%;\n  z-index: 1;\n  box-shadow: 0 0 0 0.1875rem rgb(255, 255, 255);\n}\n.history-indicator[_ngcontent-%COMP%]   .dot.current[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #10b981, #059669);\n  box-shadow: 0 0 0 0.1875rem rgba(16, 185, 129, 0.15), 0 0.125rem 0.375rem rgba(16, 185, 129, 0.25);\n}\n.history-indicator[_ngcontent-%COMP%]   .dot.past[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #94a3b8, #64748b);\n  box-shadow: 0 0 0 0.1875rem rgba(148, 163, 184, 0.15);\n}\n.history-indicator[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  width: 0.125rem;\n  flex: 1;\n  background: linear-gradient(180deg, rgba(148, 163, 184, 0.4) 0%, rgba(148, 163, 184, 0.1) 100%);\n  margin: 0.25rem 0;\n  min-height: 1rem;\n}\n\n.history-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-bottom: 0.875rem;\n}\n\n.history-card[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-radius: 0.625rem;\n  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.history-card.current[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%);\n  border: 0.0625rem solid rgba(16, 185, 129, 0.2);\n  box-shadow: 0 0.125rem 0.5rem rgba(16, 185, 129, 0.1);\n}\n.history-card.current[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.375rem 1rem rgba(16, 185, 129, 0.18);\n  transform: translateY(-0.1875rem);\n  border-color: rgba(16, 185, 129, 0.3);\n}\n.history-card.past[_ngcontent-%COMP%] {\n  background: rgba(248, 250, 252, 0.8);\n  border: 0.0625rem solid rgba(0, 0, 0, 0.06);\n}\n.history-card.past[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06);\n  transform: translateY(-0.125rem);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n\n.history-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.1875rem 0.5rem;\n  border-radius: 1rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  background: linear-gradient(135deg, #10b981, #059669);\n  color: #fff;\n  margin-bottom: 0.375rem;\n  box-shadow: 0 0.0625rem 0.25rem rgba(16, 185, 129, 0.3);\n}\n\n.history-marks[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: rgba(0, 0, 0, 0.85);\n  line-height: 1.2;\n  margin-bottom: 0.5rem;\n}\n.history-marks[_ngcontent-%COMP%]   .marks-total[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.45);\n}\n\n.history-card.past[_ngcontent-%COMP%]   .history-marks[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: rgba(0, 0, 0, 0.6);\n}\n.history-card.past[_ngcontent-%COMP%]   .history-marks[_ngcontent-%COMP%]   .marks-total[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n\n.history-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  font-size: 0.8125rem;\n  color: rgba(0, 0, 0, 0.55);\n}\n.history-meta[_ngcontent-%COMP%]   .updated-by[_ngcontent-%COMP%], .history-meta[_ngcontent-%COMP%]   .updated-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.history-meta[_ngcontent-%COMP%]   .updated-by[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .history-meta[_ngcontent-%COMP%]   .updated-date[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  width: 0.875rem;\n  height: 0.875rem;\n  opacity: 0.6;\n}\n.history-meta[_ngcontent-%COMP%]   .updated-by[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.history-card.current[_ngcontent-%COMP%]   .history-meta[_ngcontent-%COMP%]   .updated-by[_ngcontent-%COMP%] {\n  color: var(--green-text);\n}\n\n@media (max-width: 55rem) {\n  .page[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.75rem 2rem;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding-bottom: 0.625rem;\n  }\n  .selections[_ngcontent-%COMP%] {\n    max-width: 100%;\n    flex: 1 1 100%;\n  }\n  .report-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .tab-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .tab-actions[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .tab-actions[_ngcontent-%COMP%]   .action-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .review-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .q-options.two-col[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .user-review-panel[_ngcontent-%COMP%] {\n    width: 96%;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%], .resource-panel[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%], .resource-panel[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    border-radius: 0.625rem;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .panel-body[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .q-descriptive[_ngcontent-%COMP%]   .desc-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .q-descriptive[_ngcontent-%COMP%]   .desc-score[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .q-descriptive[_ngcontent-%COMP%]   .desc-header[_ngcontent-%COMP%]   .desc-score[_ngcontent-%COMP%] {\n    width: 100%;\n    flex: none;\n    margin-top: 0.5rem;\n  }\n}\n@media (max-width: 45rem) {\n  .report-summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 0.875rem;\n  }\n  .summary-card[_ngcontent-%COMP%] {\n    padding: 0.875rem;\n  }\n  .summary-meta[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n    border-radius: 0.625rem;\n    overflow: hidden;\n    border: 0.0625rem solid var(--theme-3-border);\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: left;\n    border-radius: 0;\n    border: none;\n    border-bottom: 0.0625rem solid var(--theme-3-border);\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .wrong-summary-panel[_ngcontent-%COMP%]   .summary-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 700;\n    color: var(--theme-3-text-2);\n    margin-right: 0.5rem;\n  }\n  .selections[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdXNlcnJvbGUvYWRtaW4vZXhhbS1yZXBvcnRzL2V4YW0tcmVwb3J0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0FBZEY7O0FBa0JBO0VBQXdELGFBQUE7QUFkeEQ7O0FBaUJBO0VBQVEsNEJBQUE7QUFiUjs7QUFjQTtFQUFnQixhQUFBO0VBQWUsc0JBQUE7RUFBd0IsYUFBQTtBQVJ2RDs7QUFTQTtFQUFXLGFBQUE7RUFBZSxlQUFBO0VBQWlCLG1CQUFBO0VBQXFCLDhCQUFBO0VBQWdDLGFBQUE7RUFBZSx1QkFBQTtFQUF5QixrREFBQTtBQUN4STs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUFGOztBQUVBO0VBQ0UsNkRBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrREFBQTtFQUNBLHdFQUFBO0FBQ0Y7O0FBQ0E7RUFBMkUsd0JBQUE7QUFHM0U7O0FBRkE7RUFBK0UsZUFBQTtBQU0vRTs7QUFMQTtFQUFnRixpQkFBQTtFQUFtQixpQkFBQTtBQVVuRzs7QUFUQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQVlGOztBQVZBOztFQUVFLDBDQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQWFGOztBQVhBO0VBQ0UsbUJBQUE7RUFD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LFVBQUE7SUFBWSxrQkFBQTtFQXVvRG5FO0FBQ0Y7QUFyb0RBO0VBQ0U7SUFBdUIsMEJBQUE7SUFBNEIsaUJBQUE7RUF5b0RuRDtFQXhvREE7SUFBZ0IsaUJBQUE7RUEyb0RoQjtFQTFvREE7SUFBZ0IsbUJBQUE7RUE2b0RoQjtFQTVvREE7Ozs7OztJQUt5QyxjQUFBO0lBQWdCLFdBQUE7RUFncER6RDtFQS9vREE7SUFBNEMsYUFBQTtFQWtwRDVDO0VBanBEQTtJQUErQyxzQkFBQTtJQUF3Qix1QkFBQTtJQUF5QixnQkFBQTtJQUFrQiw2Q0FBQTtFQXVwRGxIO0VBdHBEQTtJQUErQyxhQUFBO0lBQWUsOEJBQUE7SUFBZ0MsbUJBQUE7SUFBcUIsZ0JBQUE7SUFBa0IsZ0JBQUE7SUFBa0IsWUFBQTtJQUFjLG9EQUFBO0VBK3BEcks7RUE5cERBO0lBQTBELG1CQUFBO0VBaXFEMUQ7RUFocURBO0lBQXVELHlCQUFBO0lBQTJCLGdCQUFBO0lBQWtCLDRCQUFBO0lBQThCLG9CQUFBO0VBc3FEbEk7RUFycURBO0lBQWMsc0JBQUE7RUF3cURkO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRW50ZXJwcmlzZSDDosKAwpMgRXhhbSBSZXBvcnRzICAoZW5oYW5jZWQgdjIpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kZWFzZTogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiRlYXNlLXNtb290aDogY3ViaWMtYmV6aWVyKDAuNjUsIDAsIDAuMzUsIDEpO1xuJGVhc2UtYm91bmNlOiBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSk7XG4kcmFkaXVzOiAwLjc1cmVtO1xuJHNoYWRvdy1zbTogMCAwLjA2MjVyZW0gMC4xODc1cmVtIHJnYmEoMCwwLDAsMC4wNCksIDAgMC4wNjI1cmVtIDAuMTI1cmVtIHJnYmEoMCwwLDAsMC4wMyk7XG4kc2hhZG93LW1kOiAwIDAuMjVyZW0gMC43NXJlbSByZ2JhKDAsMCwwLDAuMDYpO1xuJHNoYWRvdy1sZzogMCAxLjI1cmVtIDIuNXJlbSByZ2JhKDAsMCwwLDAuMSksIDAgMC41cmVtIDFyZW0gcmdiYSgwLDAsMCwwLjA2KTtcbiRzaGFkb3ctcGFuZWw6IDAgMS41cmVtIDMuNzVyZW0gcmdiYSg1LDE4LDQwLDAuMjIpLCAwIDAuMzc1cmVtIDFyZW0gcmdiYSg1LDE4LDQwLDAuMDgpO1xuJHNoYWRvdy1ob3ZlcjogMCAwLjVyZW0gMS4yNXJlbSByZ2JhKDAsMCwwLDAuMDgpO1xuXG4vLyDDosKUwoDDosKUwoAgSG9zdCB0b2tlbnMgw6LClMKAw6LClMKAXG46aG9zdCB7XG4gIC0tZ3JlZW4tYmc6ICNlOGY5ZWY7XG4gIC0tcmVkLWJnOiAjZmZmMmY0O1xuICAtLXllbGxvdy1iZzogI2ZmZjhlNjtcbiAgLS1vcmFuZ2UtYmc6ICNmZmY0ZTE7XG4gIC0tYmx1ZS1iZzogI2U2ZjBmZjtcbiAgLS1ncmVlbi10ZXh0OiAjMTY2NTM0O1xuICAtLXJlZC10ZXh0OiAjYjkxYzFjO1xuICAtLXllbGxvdy10ZXh0OiAjYjQ1MzA5O1xuICAtLW9yYW5nZS10ZXh0OiAjYzI0MTBjO1xuICAtLWJsdWUtdGV4dDogIzBiNjZkMDtcbiAgLS1iZ3JlZW4tYm9yZGVyOiAjODZlZmFjO1xuICAtLWJyZWQtYm9yZGVyOiAjZTdkNmQ2O1xuICAtLWJ5ZWxsb3ctYm9yZGVyOiAjZmRlNjhhO1xuICAtLWJvcmFuZ2UtYm9yZGVyOiAjZmFlZWRmO1xuICAtLWJibHVlLWJvcmRlcjogIzkzYzVmZDtcbiAgLS1zY29yZS1jb2xvcjogI2YzOWMxMjtcbn1cblxuLy8gw6LClMKAw6LClMKAIE1hdGVyaWFsIG92ZXJyaWRlcyDDosKUwoDDosKUwoBcbjpob3N0IDo6bmctZGVlcCAubWF0LW1kYy1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVyIHsgZGlzcGxheTogbm9uZTsgfVxuXG4vLyDDosKUwoDDosKUwoAgUGFnZSAmIHRvb2xiYXIgw6LClMKAw6LClMKAXG4ucGFnZSB7IHBhZGRpbmc6IDEuMjVyZW0gMS41cmVtIDNyZW07IH1cbi5leGFtLXJlcG9ydHMgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDEuMTI1cmVtOyB9XG4udG9vbGJhciB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtd3JhcDogd3JhcDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBnYXA6IDAuODc1cmVtOyBwYWRkaW5nLWJvdHRvbTogMC43NXJlbTsgYm9yZGVyLWJvdHRvbTogMC4wNjI1cmVtIHNvbGlkIHJnYmEoMCwwLDAsMC4wNik7IH1cbi8vIMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkFxuLy8gU0VMRUNUSU9OUyDDosKAwpQgUHJlbWl1bSBBdXRvY29tcGxldGUgSW5wdXRzXG4vLyDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpBcbi5zZWxlY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjc1cmVtO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGZsZXg6IDEgMSAyOHJlbTtcbiAgbWluLXdpZHRoOiAxNnJlbTtcbiAgbWF4LXdpZHRoOiAzNnJlbTtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4td2lkdGg6IDE0cmVtO1xuICBtYXgtd2lkdGg6IDE4cmVtO1xufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIC5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmYWZiZmMgMTAwJSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDAgMC44NzVyZW07XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyAkZWFzZTtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4wNCksIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDIpO1xufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIC5tZGMtbm90Y2hlZC1vdXRsaW5lIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG46aG9zdCA6Om5nLWRlZXAgLnRvb2xiYXIgLnNlbGVjdGlvbnMgbWF0LWZvcm0tZmllbGQgLm1hdC1tZGMtZm9ybS1maWVsZC1mbGV4IHsgaGVpZ2h0OiAyLjc1cmVtOyB9XG46aG9zdCA6Om5nLWRlZXAgLnRvb2xiYXIgLnNlbGVjdGlvbnMgbWF0LWZvcm0tZmllbGQgLm1hdC1tZGMtZm9ybS1maWVsZC1pbmZpeCB7IHBhZGRpbmc6IDAuNXJlbSAwOyBtaW4taGVpZ2h0OiB1bnNldDsgfVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIC5tYXQtbWRjLWZsb2F0aW5nLWxhYmVsIHsgXG4gIHRvcDogMS4zNzVyZW07IFxuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBjb2xvcjogIzY0NzQ4YjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbjpob3N0IDo6bmctZGVlcCAudG9vbGJhciAuc2VsZWN0aW9ucyBtYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LW1kYy1mbG9hdGluZy1sYWJlbCxcbjpob3N0IDo6bmctZGVlcCAudG9vbGJhciAuc2VsZWN0aW9ucyBtYXQtZm9ybS1maWVsZCAubWF0LW1kYy1mbG9hdGluZy1sYWJlbC5tZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjVyZW0pIHNjYWxlKDAuNzUpO1xuICBjb2xvcjogdmFyKC0tYnV0dG9uLTEpO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIGlucHV0IHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMwZjE3MmE7XG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMWVtO1xufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIGlucHV0OjpwbGFjZWhvbGRlciB7IFxuICBjb2xvcjogIzk0YTNiODsgXG4gIGZvbnQtd2VpZ2h0OiA0MDA7IFxufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkIG1hdC1pY29uW21hdFByZWZpeF0ge1xuICBjb2xvcjogIzk0YTNiODtcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgd2lkdGg6IDEuMjVyZW07XG4gIGhlaWdodDogMS4yNXJlbTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMjVzICRlYXNlO1xufVxuOmhvc3QgOjpuZy1kZWVwIC50b29sYmFyIC5zZWxlY3Rpb25zIG1hdC1mb3JtLWZpZWxkOmhvdmVyIC5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlciB7XG4gIGJvcmRlci1jb2xvcjogI2NiZDVlMTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcbn1cbjpob3N0IDo6bmctZGVlcCAudG9vbGJhciAuc2VsZWN0aW9ucyBtYXQtZm9ybS1maWVsZDpob3ZlciBtYXQtaWNvblttYXRQcmVmaXhdIHsgY29sb3I6ICM2NDc0OGI7IH1cbjpob3N0IDo6bmctZGVlcCAudG9vbGJhciAuc2VsZWN0aW9ucyBtYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xuICBib3JkZXItY29sb3I6IHZhcigtLWJ1dHRvbi0xKTtcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMzEsIDEyMywgMjU1LCAwLjEyKSwgMCA0cHggMTZweCByZ2JhKDMxLCAxMjMsIDI1NSwgMC4wOCk7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG46aG9zdCA6Om5nLWRlZXAgLnRvb2xiYXIgLnNlbGVjdGlvbnMgbWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQgbWF0LWljb25bbWF0UHJlZml4XSB7XG4gIGNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG59XG46aG9zdCA6Om5nLWRlZXAgLnRvb2xiYXIgLnNlbGVjdGlvbnMgbWF0LWZvcm0tZmllbGQgLm1hdC1tZGMtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7IGRpc3BsYXk6IG5vbmU7IH1cblxuLy8gQXV0b2NvbXBsZXRlIHBhbmVsIHN0eWxpbmdcbjpob3N0IDo6bmctZGVlcCAubWF0LW1kYy1hdXRvY29tcGxldGUtcGFuZWwge1xuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IDAgMjBweCA0MHB4IC0xMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4wMykgIWltcG9ydGFudDtcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDAuMjVyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG46aG9zdCA6Om5nLWRlZXAgLm1hdC1tZGMtYXV0b2NvbXBsZXRlLXBhbmVsIC5tYXQtbWRjLW9wdGlvbiB7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIG1pbi1oZWlnaHQ6IDIuNzVyZW07XG4gIHRyYW5zaXRpb246IGFsbCAwLjE1cyAkZWFzZTtcbn1cbjpob3N0IDo6bmctZGVlcCAubWF0LW1kYy1hdXRvY29tcGxldGUtcGFuZWwgLm1hdC1tZGMtb3B0aW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSg5OSwgMTAyLCAyNDEsIDAuMDYpIDAlLCByZ2JhKDEzOSwgOTIsIDI0NiwgMC4wNCkgMTAwJSk7XG59XG46aG9zdCA6Om5nLWRlZXAgLm1hdC1tZGMtYXV0b2NvbXBsZXRlLXBhbmVsIC5tYXQtbWRjLW9wdGlvbi5tYXQtbWRjLW9wdGlvbi1hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDMxLCAxMjMsIDI1NSwgMC4xKSAwJSwgcmdiYSgzMSwgMTIzLCAyNTUsIDAuMDYpIDEwMCUpO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5tYXQtbWRjLWF1dG9jb21wbGV0ZS1wYW5lbCAubWF0LW1kYy1vcHRpb24gLm9wdGlvbi1tYWluIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMwZjE3MmE7XG59XG46aG9zdCA6Om5nLWRlZXAgLm1hdC1tZGMtYXV0b2NvbXBsZXRlLXBhbmVsIC5tYXQtbWRjLW9wdGlvbiAub3B0aW9uLXN1YiB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgY29sb3I6ICM2NDc0OGI7XG4gIG1hcmdpbi10b3A6IDAuMTI1cmVtO1xufVxuLmNvbnRyb2xzIHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAwLjVyZW07IH1cbi5hY3Rpb24tcm93IHsgZGlzcGxheTogZmxleDsgZ2FwOiAwLjVyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbi5idXR0b24tb25lIHsgYmFja2dyb3VuZDogdmFyKC0tYnV0dG9uLTEpICFpbXBvcnRhbnQ7IGNvbG9yOiB2YXIoLS1idXR0b24tdGV4dC0xKSAhaW1wb3J0YW50OyBib3JkZXItcmFkaXVzOiAwLjVyZW0gIWltcG9ydGFudDsgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50OyBsZXR0ZXItc3BhY2luZzogMC4wMWVtOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMjVzICRlYXNlLCBib3gtc2hhZG93IDAuMjVzICRlYXNlLCB0cmFuc2Zvcm0gMC4ycyAkZWFzZS1ib3VuY2UgIWltcG9ydGFudDsgfVxuLmJ1dHRvbi1vbmU6aG92ZXIgeyBiYWNrZ3JvdW5kOiB2YXIoLS1idXR0b24tMS1ob3ZlcikgIWltcG9ydGFudDsgY29sb3I6IHZhcigtLWJ1dHRvbi10ZXh0LTIpICFpbXBvcnRhbnQ7IGJveC1zaGFkb3c6ICRzaGFkb3ctbWQgIWltcG9ydGFudDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjA2MjVyZW0pOyB9XG5cbi8vIMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkFxuLy8gRklMVEVSUyBPVkVSTEFZIFBBTkVMIMOiwoDClCBNb2Rlcm4gZmllbGQgZGVzaWduXG4vLyDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpBcbi5maWx0ZXJzLXBhbmVsIHtcbiAgd2lkdGg6IDI0cmVtO1xuICBtYXgtaGVpZ2h0OiA3NXZoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZmFmYmZjIDEwMCUpO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDE1LCAyMywgNDIsIDAuMDgpO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBib3gtc2hhZG93OiAwIDEuMjVyZW0gM3JlbSByZ2JhKDE1LCAyMywgNDIsIDAuMTYpLCAwIDAuMzc1cmVtIDFyZW0gcmdiYSgxNSwgMjMsIDQyLCAwLjA2KTtcbiAgYW5pbWF0aW9uOiBzbGlkZVVwIDAuMjhzICRlYXNlLWJvdW5jZTtcbn1cblxuLmZpbHRlcnMtcGFuZWwtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxcmVtIDEuMTI1cmVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgxNSwgMjMsIDQyLCAwLjA2KTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZhZmJmYyAwJSwgI2ZmZmZmZiAxMDAlKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG4uZmlsdGVycy1wYW5lbC1oZWFkZXIgaDQge1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMwZjE3MmE7XG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMWVtO1xufVxuLmZpbHRlcnMtcGFuZWwtaGVhZGVyIGg0IG1hdC1pY29uIHtcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgd2lkdGg6IDEuMTI1cmVtO1xuICBoZWlnaHQ6IDEuMTI1cmVtO1xuICBjb2xvcjogdmFyKC0tYnV0dG9uLTEpO1xufVxuXG4uZmlsdGVyLWJsb2NrIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICBnYXA6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDFyZW0gMS4xMjVyZW07XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGZsZXg6IDE7XG59XG4uZmlsdGVyLWl0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4vLyBGaWx0ZXIgZmllbGQgOjpuZy1kZWVwIG92ZXJyaWRlcyDDosKAwpQgbW9kZXJuIGNvbXBhY3QgbG9va1xuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbSAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICBib3JkZXItcmFkaXVzOiAwLjYyNXJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycyAkZWFzZSwgYm94LXNoYWRvdyAwLjJzICRlYXNlLCBiYWNrZ3JvdW5kIDAuMnMgJGVhc2U7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDE1LCAyMywgNDIsIDAuMDMpO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbSAubWRjLW5vdGNoZWQtb3V0bGluZSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbSAubWF0LW1kYy1mb3JtLWZpZWxkLWZsZXggeyBoZWlnaHQ6IDIuNXJlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbSAubWF0LW1kYy1mb3JtLWZpZWxkLWluZml4IHsgcGFkZGluZzogMC4zNzVyZW0gMDsgbWluLWhlaWdodDogdW5zZXQ7IH1cbjpob3N0IDo6bmctZGVlcCAuZmlsdGVycy1wYW5lbCAuZmlsdGVyLWl0ZW0gLm1hdC1tZGMtZmxvYXRpbmctbGFiZWwge1xuICB0b3A6IDEuMjVyZW07XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICBjb2xvcjogIzY0NzQ4Yjtcbn1cbjpob3N0IDo6bmctZGVlcCAuZmlsdGVycy1wYW5lbCAuZmlsdGVyLWl0ZW0ubWF0LWZvY3VzZWQgLm1hdC1tZGMtZmxvYXRpbmctbGFiZWwsXG46aG9zdCA6Om5nLWRlZXAgLmZpbHRlcnMtcGFuZWwgLmZpbHRlci1pdGVtIC5tYXQtbWRjLWZsb2F0aW5nLWxhYmVsLm1kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUge1xuICBjb2xvcjogdmFyKC0tYnV0dG9uLTEpO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbSBpbnB1dCxcbjpob3N0IDo6bmctZGVlcCAuZmlsdGVycy1wYW5lbCAuZmlsdGVyLWl0ZW0gLm1hdC1tZGMtc2VsZWN0LXZhbHVlLXRleHQge1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMwZjE3MmE7XG59XG46aG9zdCA6Om5nLWRlZXAgLmZpbHRlcnMtcGFuZWwgLmZpbHRlci1pdGVtIC5tYXQtbWRjLXNlbGVjdC1hcnJvdyxcbjpob3N0IDo6bmctZGVlcCAuZmlsdGVycy1wYW5lbCAuZmlsdGVyLWl0ZW0gLm1hdC1kYXRlcGlja2VyLXRvZ2dsZSAubWF0LWljb24geyBjb2xvcjogIzk0YTNiODsgfVxuXG4vLyBIb3ZlclxuOmhvc3QgOjpuZy1kZWVwIC5maWx0ZXJzLXBhbmVsIC5maWx0ZXItaXRlbTpob3ZlciAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIge1xuICBib3JkZXItY29sb3I6ICNjYmQ1ZTE7XG4gIGJveC1zaGFkb3c6IDAgMC4yNXJlbSAwLjYyNXJlbSByZ2JhKDE1LCAyMywgNDIsIDAuMDYpO1xufVxuLy8gRm9jdXNcbjpob3N0IDo6bmctZGVlcCAuZmlsdGVycy1wYW5lbCAuZmlsdGVyLWl0ZW0ubWF0LWZvY3VzZWQgLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDMxLCAxMjMsIDI1NSwgMC4xMik7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG46aG9zdCA6Om5nLWRlZXAgLmZpbHRlcnMtcGFuZWwgLmZpbHRlci1pdGVtIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIgeyBkaXNwbGF5OiBub25lOyB9XG4vLyBEYXRlcGlja2VyIHRvZ2dsZSBidXR0b24gYWxpZ25tZW50XG46aG9zdCA6Om5nLWRlZXAgLmZpbHRlcnMtcGFuZWwgLmZpbHRlci1pdGVtIC5tYXQtZGF0ZXBpY2tlci10b2dnbGUgYnV0dG9uIHtcbiAgd2lkdGg6IDEuNzVyZW07XG4gIGhlaWdodDogMS43NXJlbTtcbiAgcGFkZGluZzogMDtcbn1cblxuLy8gU3BhbiBkYXRlIHBpY2tlcnMgZnVsbCB3aWR0aCBvbiBuYXJyb3cgZ3JpZHNcbi5maWx0ZXItaXRlbTpudGgtbGFzdC1jaGlsZCgtbisyKSB7IGdyaWQtY29sdW1uOiBzcGFuIDE7IH1cblxuLmZpbHRlci1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjVyZW07XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIHBhZGRpbmc6IDAuODc1cmVtIDEuMTI1cmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgxNSwgMjMsIDQyLCAwLjA2KTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZhZmJmYyAwJSwgI2ZmZmZmZiAxMDAlKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG4uZmlsdGVyLWFwcGx5LWJ0biB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJ1dHRvbi0xKSAhaW1wb3J0YW50O1xuICBjb2xvcjogdmFyKC0tYnV0dG9uLXRleHQtMSkgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW0gIWltcG9ydGFudDtcbiAgcGFkZGluZzogMCAxcmVtICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMi4yNXJlbTtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzICRlYXNlLCBib3gtc2hhZG93IDAuMnMgJGVhc2UsIHRyYW5zZm9ybSAwLjJzICRlYXNlLWJvdW5jZSAhaW1wb3J0YW50O1xufVxuLmZpbHRlci1hcHBseS1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1idXR0b24tMS1ob3ZlcikgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogJHNoYWRvdy1tZCAhaW1wb3J0YW50O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMDYyNXJlbSk7XG59XG4uZmlsdGVyLXJlc2V0LWJ0biB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgY29sb3I6ICM0NzU1NjkgIWltcG9ydGFudDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW0gIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDAuODEyNXJlbSAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDFyZW0gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAyLjI1cmVtO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMgJGVhc2UsIGJvcmRlci1jb2xvciAwLjJzICRlYXNlICFpbXBvcnRhbnQ7XG59XG4uZmlsdGVyLXJlc2V0LWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmMgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjY2JkNWUxICFpbXBvcnRhbnQ7XG59XG4uZmlsdGVyLWFwcGx5LWJ0biBtYXQtaWNvbixcbi5maWx0ZXItcmVzZXQtYnRuIG1hdC1pY29uIHsgZm9udC1zaXplOiAxcmVtOyB3aWR0aDogMXJlbTsgaGVpZ2h0OiAxcmVtOyBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07IH1cblxuQGtleWZyYW1lcyBzbGlkZVVwIHsgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjVyZW0pOyB9IHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cblxuLy8gw6LClMKAw6LClMKAIExpc3QgY2FyZCArIHRhYnMgd3JhcHBlciDDosKUwoDDosKUwoBcbi5saXN0LWNhcmQgeyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCAjZTJlOGYwOyBib3JkZXItcmFkaXVzOiAkcmFkaXVzOyBib3gtc2hhZG93OiAkc2hhZG93LW1kOyBvdmVyZmxvdzogaGlkZGVuOyB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuM3MgJGVhc2UsIGJvcmRlci1jb2xvciAwLjNzICRlYXNlOyB9XG4ubGlzdC1jYXJkOmhvdmVyIHsgYm94LXNoYWRvdzogJHNoYWRvdy1ob3ZlcjsgYm9yZGVyLWNvbG9yOiByZ2JhKDk5LDEwMiwyNDEsMC4xNSk7IH1cbi5saXN0LXdyYXBwZXIgeyBvdmVyZmxvdzogaGlkZGVuOyB9XG4uZXhhbS10YWJzIHsgd2lkdGg6IDEwMCU7IH1cbi5pbm5lci1hbmFseXRpY3MtdGFicyB7IHdpZHRoOiAxMDAlOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBNYWluIHRhYnMgKFVzZXIgUmVwb3J0IC8gQW5hbHl0aWNzIFJlcG9ydCkgw6LClMKAw6LClMKAXG46aG9zdCA6Om5nLWRlZXAgLmV4YW0tdGFicyAubWF0LW1kYy10YWItaGVhZGVyIHsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0yKSAwJSwgdmFyKC0tYmctMSkgMTAwJSk7IGJvcmRlci1ib3R0b206MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgcGFkZGluZzowIDAuNXJlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5leGFtLXRhYnMgLm1hdC1tZGMtdGFiLWxhYmVscyB7IG1pbi1oZWlnaHQ6M3JlbTsgZ2FwOjAuMTI1cmVtOyB9XG46aG9zdCA6Om5nLWRlZXAgLmV4YW0tdGFicyAubWRjLXRhYiB7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0zKTsgZm9udC13ZWlnaHQ6NjAwOyBmb250LXNpemU6MC44NzVyZW07IHBhZGRpbmc6MCAxLjI1cmVtOyBtaW4taGVpZ2h0OjNyZW07IGJvcmRlci1yYWRpdXM6JHJhZGl1cyAkcmFkaXVzIDAgMDsgdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIDAuMnMgJGVhc2UsIGNvbG9yIDAuMnMgJGVhc2U7IGxldHRlci1zcGFjaW5nOjAuMDFlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5leGFtLXRhYnMgLm1kYy10YWI6aG92ZXIgeyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMSk7IH1cbjpob3N0IDo6bmctZGVlcCAuZXhhbS10YWJzIC5tZGMtdGFiLS1hY3RpdmUgeyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBjb2xvcjp2YXIoLS1idXR0b24tMSk7IGJveC1zaGFkb3c6aW5zZXQgMCAtMC4xMjVyZW0gMCB2YXIoLS1idXR0b24tMSk7IH1cbjpob3N0IDo6bmctZGVlcCAuZXhhbS10YWJzIC5tZGMtdGFiLS1hY3RpdmUgLm1kYy10YWJfX3RleHQtbGFiZWwgeyBjb2xvcjp2YXIoLS1idXR0b24tMSk7IH1cbjpob3N0IDo6bmctZGVlcCAuZXhhbS10YWJzIC5tZGMtdGFiX190ZXh0LWxhYmVsIHsgZm9udC13ZWlnaHQ6NjAwOyBsZXR0ZXItc3BhY2luZzowLjAxZW07IHRyYW5zaXRpb246Y29sb3IgMC4ycyAkZWFzZTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5leGFtLXRhYnMgLm1hdC1tZGMtdGFiLWJvZHktd3JhcHBlciB7IGJhY2tncm91bmQ6dmFyKC0tYmctMSk7IH1cbjpob3N0IDo6bmctZGVlcCAuZXhhbS10YWJzIC5tZGMtdGFiLWluZGljYXRvcl9fY29udGVudC0tdW5kZXJsaW5lIHsgYm9yZGVyLWNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgYm9yZGVyLXdpZHRoOjAuMTI1cmVtOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBJbm5lciBhbmFseXRpY3MgdGFicyAoQ2F0ZWdvcnkgUmVwb3J0IC8gUXVlc3Rpb24gU3VtbWFyeSkgw6LClMKAw6LClMKAXG46aG9zdCA6Om5nLWRlZXAgLmlubmVyLWFuYWx5dGljcy10YWJzIC5tYXQtbWRjLXRhYi1oZWFkZXIgeyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBib3JkZXItYm90dG9tOjAuMDYyNXJlbSBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IHBhZGRpbmc6MCAwLjc1cmVtOyB9XG46aG9zdCA6Om5nLWRlZXAgLmlubmVyLWFuYWx5dGljcy10YWJzIC5tYXQtbWRjLXRhYi1sYWJlbHMgeyBtaW4taGVpZ2h0OjIuNjI1cmVtOyBnYXA6MC4yNXJlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5pbm5lci1hbmFseXRpY3MtdGFicyAubWRjLXRhYiB7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0zKTsgZm9udC13ZWlnaHQ6NjAwOyBmb250LXNpemU6MC44MTI1cmVtOyBwYWRkaW5nOjAgMXJlbTsgbWluLWhlaWdodDoyLjYyNXJlbTsgYm9yZGVyLXJhZGl1czowLjVyZW0gMC41cmVtIDAgMDsgdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIDAuMnMgJGVhc2UsIGNvbG9yIDAuMnMgJGVhc2U7IH1cbjpob3N0IDo6bmctZGVlcCAuaW5uZXItYW5hbHl0aWNzLXRhYnMgLm1kYy10YWI6aG92ZXIgeyBiYWNrZ3JvdW5kOnZhcigtLWJnLTIpOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMSk7IH1cbjpob3N0IDo6bmctZGVlcCAuaW5uZXItYW5hbHl0aWNzLXRhYnMgLm1kYy10YWItLWFjdGl2ZSB7IGJhY2tncm91bmQ6dmFyKC0tYmctMik7IGNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5pbm5lci1hbmFseXRpY3MtdGFicyAubWRjLXRhYi0tYWN0aXZlIC5tZGMtdGFiX190ZXh0LWxhYmVsIHsgY29sb3I6dmFyKC0tYnV0dG9uLTEpOyB9XG46aG9zdCA6Om5nLWRlZXAgLmlubmVyLWFuYWx5dGljcy10YWJzIC5tZGMtdGFiX190ZXh0LWxhYmVsIHsgZm9udC13ZWlnaHQ6NjAwOyBsZXR0ZXItc3BhY2luZzowLjAxZW07IHRyYW5zaXRpb246Y29sb3IgMC4ycyAkZWFzZTsgfVxuOmhvc3QgOjpuZy1kZWVwIC5pbm5lci1hbmFseXRpY3MtdGFicyAubWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSB7IGJvcmRlci1jb2xvcjp2YXIoLS1idXR0b24tMSk7IGJvcmRlci13aWR0aDowLjEyNXJlbTsgfVxuXG4ucmVwb3J0LXN1bW1hcnktZ3JpZCB7IGRpc3BsYXk6Z3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdCg0LCBtaW5tYXgoMCwgMWZyKSk7IGdhcDowLjg3NXJlbTsgcGFkZGluZzoxLjI1cmVtIDFyZW07IGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYmctMSkgMCUsIHZhcigtLWJnLTIpIDEwMCUpOyBib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IH1cbi5hbmFseXRpY3Mtc3VtbWFyeS1ncmlkIHsgcGFkZGluZzowLjI1cmVtIDAgMXJlbTsgYmFja2dyb3VuZDp0cmFuc3BhcmVudDsgYm9yZGVyLWJvdHRvbTpub25lOyB9XG4uc3VtbWFyeS1jYXJkIHsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpmbGV4LXN0YXJ0OyBnYXA6MC44NzVyZW07IG1pbi13aWR0aDowOyBwYWRkaW5nOjFyZW0gMS4xMjVyZW07IGJvcmRlcjoxcHggc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBib3JkZXItcmFkaXVzOjAuODc1cmVtOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWJnLTEpIDAlLCB2YXIoLS1iZy0yKSAxMDAlKTsgYm94LXNoYWRvdzowIDAuMjVyZW0gMC43NXJlbSB2YXIoLS10aGVtZS0zLWhhbm92ZXItYmcpOyB0cmFuc2l0aW9uOnRyYW5zZm9ybSAwLjI1cyAkZWFzZS1ib3VuY2UsIGJvcmRlci1jb2xvciAwLjI1cyAkZWFzZSwgYm94LXNoYWRvdyAwLjI1cyAkZWFzZTsgfVxuLnN1bW1hcnktY2FyZDpob3ZlciB7IHRyYW5zZm9ybTp0cmFuc2xhdGVZKC0wLjE4NzVyZW0pOyBib3JkZXItY29sb3I6dmFyKC0tYnV0dG9uLTEpOyBib3gtc2hhZG93OjAgMC43NXJlbSAxLjVyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKTsgfVxuLnN1bW1hcnktaWNvbiB7IHdpZHRoOjIuNzVyZW07IGhlaWdodDoyLjc1cmVtOyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OmNlbnRlcjsgZmxleC1zaHJpbms6MDsgYm9yZGVyLXJhZGl1czowLjg3NXJlbTsgYmFja2dyb3VuZDp2YXIoLS10aGVtZS0yLWhhbm92ZXItYmcpOyBjb2xvcjp2YXIoLS1idXR0b24tMSk7IHRyYW5zaXRpb246dHJhbnNmb3JtIDAuMnMgJGVhc2UtYm91bmNlOyB9XG4uc3VtbWFyeS1pY29uOmhvdmVyIHsgdHJhbnNmb3JtOnNjYWxlKDEuMDUpOyB9XG4uc3VtbWFyeS1pY29uIG1hdC1pY29uIHsgZm9udC1zaXplOjEuMjVyZW07IHdpZHRoOjEuMjVyZW07IGhlaWdodDoxLjI1cmVtOyB9XG4vLyBJY29uIGNvbG9yIHZhcmlhbnRzXG4uc3VtbWFyeS1pY29uLS1zdHVkZW50cyB7IGJhY2tncm91bmQ6cmdiYSg5OSwxMDIsMjQxLDAuMSk7IGNvbG9yOiM2MzY2ZjE7IH1cbi5zdW1tYXJ5LWljb24tLXBhZ2UgeyBiYWNrZ3JvdW5kOnJnYmEoNTksMTMwLDI0NiwwLjEpOyBjb2xvcjojM2I4MmY2OyB9XG4uc3VtbWFyeS1pY29uLS1zY29yZSB7IGJhY2tncm91bmQ6cmdiYSgyNDUsMTU4LDExLDAuMSk7IGNvbG9yOiNmNTllMGI7IH1cbi5zdW1tYXJ5LWljb24tLXBhc3MgeyBiYWNrZ3JvdW5kOnJnYmEoMTYsMTg1LDEyOSwwLjEpOyBjb2xvcjojMTBiOTgxOyB9XG4uc3VtbWFyeS1pY29uLS1jYXRlZ29yaWVzIHsgYmFja2dyb3VuZDpyZ2JhKDEzOSw5MiwyNDYsMC4xKTsgY29sb3I6IzhiNWNmNjsgfVxuLnN1bW1hcnktaWNvbi0tcXVlc3Rpb25zIHsgYmFja2dyb3VuZDpyZ2JhKDU5LDEzMCwyNDYsMC4xKTsgY29sb3I6IzNiODJmNjsgfVxuLnN1bW1hcnktaWNvbi0tYXR0ZW1wdHMgeyBiYWNrZ3JvdW5kOnJnYmEoOTksMTAyLDI0MSwwLjEpOyBjb2xvcjojNjM2NmYxOyB9XG4uc3VtbWFyeS1pY29uLS1taXN0YWtlcyB7IGJhY2tncm91bmQ6cmdiYSgyMzksNjgsNjgsMC4xKTsgY29sb3I6I2VmNDQ0NDsgfVxuLnN1bW1hcnktY29weSB7IGRpc3BsYXk6ZmxleDsgZmxleC1kaXJlY3Rpb246Y29sdW1uOyBnYXA6MC4yNXJlbTsgbWluLXdpZHRoOjA7IH1cbi5zdW1tYXJ5LWxhYmVsIHsgZm9udC1zaXplOnZhcigtLWZvbnQteHMpOyBmb250LXdlaWdodDo3MDA7IGxldHRlci1zcGFjaW5nOjAuMDhlbTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMyk7IH1cbi5zdW1tYXJ5LXZhbHVlIHsgZm9udC1zaXplOmNsYW1wKDEuMjVyZW0sIDEuMDVyZW0gKyAwLjd2dywgMS43NXJlbSk7IGZvbnQtd2VpZ2h0OjgwMDsgbGluZS1oZWlnaHQ6MTsgbGV0dGVyLXNwYWNpbmc6LTAuMDNlbTsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTEpOyB9XG4uc3VtbWFyeS1tZXRhIHsgZm9udC1zaXplOnZhcigtLWZvbnQteHNtKTsgZm9udC13ZWlnaHQ6NTAwOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMik7IHdoaXRlLXNwYWNlOm5vd3JhcDsgb3ZlcmZsb3c6aGlkZGVuOyB0ZXh0LW92ZXJmbG93OmVsbGlwc2lzOyB9XG5cbi8vIMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkMOiwpXCkFxuLy8gVEFCIEFDVElPTlMgw6LCgMKUIENvbXBhY3QgU2VhcmNoICYgQWN0aW9uIEJhciAoSW5zaWRlIFRhYnMpXG4vLyDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpDDosKVwpBcbi50YWItYWN0aW9ucyB7IGRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjFyZW07IHBhZGRpbmc6MC44NzVyZW0gMXJlbSAxcmVtOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLWJnLTIpIDAlLCB2YXIoLS1iZy0xKSAxMDAlKTsgYm9yZGVyLWJvdHRvbToxcHggc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBtYXJnaW46MDsgfVxuXG4vLyBDb21wYWN0IFNlYXJjaFxuLnRhYi1hY3Rpb25zIC5zZWFyY2ggeyBmbGV4OjE7IG1heC13aWR0aDoyMHJlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIG1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG46aG9zdCA6Om5nLWRlZXAgLnRhYi1hY3Rpb25zIC5zZWFyY2ggLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0xKSAwJSwgdmFyKC0tYmctMikgMTAwJSk7IGJvcmRlcjoxcHggc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBib3JkZXItcmFkaXVzOjAuNzVyZW07IHBhZGRpbmc6MCAwLjc1cmVtOyB0cmFuc2l0aW9uOmFsbCAwLjJzICRlYXNlOyBib3gtc2hhZG93OjAgMC41cmVtIDFyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIC5tZGMtbm90Y2hlZC1vdXRsaW5lIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG46aG9zdCA6Om5nLWRlZXAgLnRhYi1hY3Rpb25zIC5zZWFyY2ggLm1hdC1tZGMtZm9ybS1maWVsZC1mbGV4IHsgaGVpZ2h0OiAyLjM3NXJlbTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIC5tYXQtbWRjLWZvcm0tZmllbGQtaW5maXggeyBwYWRkaW5nOiAwLjM3NXJlbSAwOyBtaW4taGVpZ2h0OiB1bnNldDsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIC5tYXQtbWRjLWZsb2F0aW5nLWxhYmVsIHsgdG9wOjEuMTg3NXJlbTsgZm9udC1zaXplOjAuODEyNXJlbTsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTMpOyB9XG46aG9zdCA6Om5nLWRlZXAgLnRhYi1hY3Rpb25zIC5zZWFyY2ggaW5wdXQgeyBmb250LXNpemU6MC44MTI1cmVtOyBmb250LXdlaWdodDo1MDA7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0xKTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIGlucHV0OjpwbGFjZWhvbGRlciB7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0zKTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIG1hdC1pY29uW21hdFByZWZpeF0geyBjb2xvcjp2YXIoLS10aGVtZS0zLWljb24tMSk7IG1hcmdpbi1yaWdodDowLjVyZW07IGZvbnQtc2l6ZToxLjEyNXJlbTsgd2lkdGg6MS4xMjVyZW07IGhlaWdodDoxLjEyNXJlbTsgdHJhbnNpdGlvbjphbGwgMC4ycyAkZWFzZTsgfVxuLnRhYi1hY3Rpb25zIC5zZWFyY2g6aG92ZXIgOjpuZy1kZWVwIC5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlciB7IGJvcmRlci1jb2xvcjp2YXIoLS1idXR0b24tMSk7IGJveC1zaGFkb3c6MCAwLjc1cmVtIDEuNXJlbSB2YXIoLS10aGVtZS0zLWhhbm92ZXItYmcpOyB9XG4udGFiLWFjdGlvbnMgLnNlYXJjaDpob3ZlciA6Om5nLWRlZXAgbWF0LWljb25bbWF0UHJlZml4XSB7IGNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgfVxuOmhvc3QgOjpuZy1kZWVwIC50YWItYWN0aW9ucyAuc2VhcmNoIC5tYXQtZm9jdXNlZCAubWF0LW1kYy10ZXh0LWZpZWxkLXdyYXBwZXIsXG46aG9zdCA6Om5nLWRlZXAgLnRhYi1hY3Rpb25zIC5zZWFyY2ggbWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQgLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCB2YXIoLS10aGVtZS0yLWhhbm92ZXItYmcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy0xKTtcbn1cbjpob3N0IDo6bmctZGVlcCAudGFiLWFjdGlvbnMgLnNlYXJjaCBtYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCBtYXQtaWNvblttYXRQcmVmaXhdIHtcbiAgY29sb3I6IHZhcigtLWJ1dHRvbi0xKTtcbn1cbjpob3N0IDo6bmctZGVlcCAudGFiLWFjdGlvbnMgLnNlYXJjaCAubWF0LW1kYy1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVyIHsgZGlzcGxheTogbm9uZTsgfVxuXG4vLyBDb21wYWN0IEFjdGlvbiBCdXR0b25zXG4udGFiLWFjdGlvbnMgLmNvbnRyb2xzIHsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDowLjVyZW07IH1cbi50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyB7IGRpc3BsYXk6ZmxleDsgZ2FwOjAuMzc1cmVtOyBhbGlnbi1pdGVtczpjZW50ZXI7IH1cbi50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyBidXR0b24geyBoZWlnaHQ6Mi4yNXJlbTsgcGFkZGluZzowIDAuODc1cmVtOyBmb250LXNpemU6MC43NXJlbTsgZm9udC13ZWlnaHQ6NjAwOyBsZXR0ZXItc3BhY2luZzotMC4wMWVtOyBib3JkZXItcmFkaXVzOjAuNjI1cmVtOyBkaXNwbGF5OmlubGluZS1mbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGp1c3RpZnktY29udGVudDpjZW50ZXI7IGdhcDowLjM3NXJlbTsgdHJhbnNpdGlvbjphbGwgMC4ycyAkZWFzZTsgfVxuLnRhYi1hY3Rpb25zIC5hY3Rpb24tcm93IGJ1dHRvbiBtYXQtaWNvbiB7IGZvbnQtc2l6ZToxcmVtOyB3aWR0aDoxcmVtOyBoZWlnaHQ6MXJlbTsgfVxuLy8gU2Vjb25kYXJ5IGJ1dHRvbiBzdHlsZSAoU2VhcmNoLCBFeHBvcnQpXG4udGFiLWFjdGlvbnMgLmFjdGlvbi1yb3cgYnV0dG9uW21hdC1zdHJva2VkLWJ1dHRvbl0sXG4udGFiLWFjdGlvbnMgLmFjdGlvbi1yb3cgYnV0dG9uW21hdC1idXR0b25dIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYmctMSkgMCUsIHZhcigtLWJnLTIpIDEwMCUpO1xuICBjb2xvcjogdmFyKC0tdGhlbWUtMy10ZXh0LTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7XG4gIGJveC1zaGFkb3c6IDAgMC41cmVtIDFyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKTtcbn1cbi50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyBidXR0b25bbWF0LXN0cm9rZWQtYnV0dG9uXTpob3Zlcixcbi50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyBidXR0b25bbWF0LWJ1dHRvbl06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy0xKTtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gIGNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gIGJveC1zaGFkb3c6IDAgMC43NXJlbSAxLjVyZW0gdmFyKC0tdGhlbWUtMi1oYW5vdmVyLWJnKTtcbn1cbi8vIFByaW1hcnkgYnV0dG9uIHN0eWxlXG4udGFiLWFjdGlvbnMgLmFjdGlvbi1yb3cgYnV0dG9uW21hdC1mbGF0LWJ1dHRvbl0ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1idXR0b24tMSkgMCUsIHZhcigtLWJ1dHRvbi0xLWhvdmVyKSAxMDAlKTtcbiAgY29sb3I6IHZhcigtLWJ1dHRvbi10ZXh0LTEpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IDAgMC43NXJlbSAxLjVyZW0gdmFyKC0tdGhlbWUtMi1oYW5vdmVyLWJnKTtcbn1cbi50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyBidXR0b25bbWF0LWZsYXQtYnV0dG9uXTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWJ1dHRvbi0xLWhvdmVyKSAwJSwgdmFyKC0tYnV0dG9uLTEpIDEwMCUpO1xuICBib3gtc2hhZG93OiAwIDFyZW0gMnJlbSB2YXIoLS10aGVtZS0yLWhhbm92ZXItYmcpO1xufVxuXG4vLyDDosKUwoDDosKUwoAgUHJlbWl1bSB0YWJsZSDDosKUwoDDosKUwoBcbi50YWJsZS13cmFwIHsgb3ZlcmZsb3cteDphdXRvOyBwYWRkaW5nOjAgMXJlbSAxcmVtOyB9XG4ucHJlbWl1bS10YWJsZSB7IHdpZHRoOiAxMDAlOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBib3JkZXItcmFkaXVzOjAuNXJlbTsgb3ZlcmZsb3c6aGlkZGVuOyB9XG4ucHJlbWl1bS10YWJsZSB0aC5tYXQtaGVhZGVyLWNlbGwgeyBwb3NpdGlvbjogc3RpY2t5OyB0b3A6IDA7IHotaW5kZXg6IDI7IGJhY2tncm91bmQ6IHZhcigtLXRhYmxlLWhlYWRlci1iZywgI2Y4ZmFmYyk7IGZvbnQtd2VpZ2h0OiA3MDA7IGZvbnQtc2l6ZTogMC44MTI1cmVtOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4wNGVtOyBjb2xvcjogdmFyKC0tdGFibGUtaGVhZGVyLXRleHQsICM0NzU1NjkpOyBwYWRkaW5nOiAwLjc1cmVtIDAuODc1cmVtOyBib3JkZXItYm90dG9tOiAwLjEyNXJlbSBzb2xpZCAjZTJlOGYwOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XG4ucHJlbWl1bS10YWJsZSB0aC5tYXQtaGVhZGVyLWNlbGw6Zmlyc3QtY2hpbGQgeyBib3JkZXItbGVmdDogMC4xODc1cmVtIHNvbGlkIHZhcigtLWJ1dHRvbi0xKTsgfVxuLnByZW1pdW0tdGFibGUgdGQubWF0LWNlbGwgeyBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTsgZm9udC1zaXplOiAwLjgxMjVyZW07IGNvbG9yOiB2YXIoLS10aGVtZS0zLXRleHQtMiwgIzMzNDE1NSk7IGJvcmRlci1ib3R0b206IDAuMDYyNXJlbSBzb2xpZCAjZjFmNWY5OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMgJGVhc2UsIGJveC1zaGFkb3cgMC4ycyAkZWFzZTsgfVxuLnByZW1pdW0tdGFibGUgdHIubWF0LXJvdzpudGgtY2hpbGQoZXZlbikgdGQgeyBiYWNrZ3JvdW5kOiByZ2JhKDI0OCwyNTAsMjUyLDAuNSk7IH1cbi5wcmVtaXVtLXRhYmxlIHRyLm1hdC1yb3c6aG92ZXIgdGQgeyBiYWNrZ3JvdW5kOiByZ2JhKDk5LDEwMiwyNDEsMC4wNDUpOyBib3gtc2hhZG93OiBpbnNldCAwLjE4NzVyZW0gMCAwIHZhcigtLWJ1dHRvbi0xKTsgfVxuLnN0dWRlbnQtbmFtZSB7IGNvbG9yOiB2YXIoLS1idXR0b24tMSk7IGN1cnNvcjogcG9pbnRlcjsgZm9udC13ZWlnaHQ6IDYwMDsgZm9udC1zaXplOiB2YXIoLS1mb250LW1kKTsgbGV0dGVyLXNwYWNpbmc6IC0wLjAxZW07IHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAkZWFzZSwgdHJhbnNmb3JtIDAuMnMgJGVhc2UtYm91bmNlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cbi5zdHVkZW50LW5hbWU6aG92ZXIgeyBvcGFjaXR5OiAwLjg1OyB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgdGV4dC11bmRlcmxpbmUtb2Zmc2V0OiAwLjEyNXJlbTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuMDYyNXJlbSk7IH1cblxuLy8gw6LClMKAw6LClMKAIFN0dWRlbnQgLyBDYXRlZ29yeSBhdmF0YXIgY2VsbHMgw6LClMKAw6LClMKAXG4uc3R1ZGVudC1jZWxsIHsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDowLjYyNXJlbTsgY3Vyc29yOnBvaW50ZXI7IH1cbi5zdHVkZW50LWF2YXRhciB7IHdpZHRoOjJyZW07IGhlaWdodDoycmVtOyBib3JkZXItcmFkaXVzOjAuNXJlbTsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGp1c3RpZnktY29udGVudDpjZW50ZXI7IGZvbnQtd2VpZ2h0OjcwMDsgZm9udC1zaXplOjAuODEyNXJlbTsgY29sb3I6I2ZmZjsgZmxleC1zaHJpbms6MDsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpOyB9XG4uY2F0ZWdvcnktY2VsbCB7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MC42MjVyZW07IGN1cnNvcjpwb2ludGVyOyB9XG4uY2F0ZWdvcnktYXZhdGFyIHsgd2lkdGg6MnJlbTsgaGVpZ2h0OjJyZW07IGJvcmRlci1yYWRpdXM6MC41cmVtOyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OmNlbnRlcjsgZm9udC13ZWlnaHQ6NzAwOyBmb250LXNpemU6MC44MTI1cmVtOyBjb2xvcjojZmZmOyBmbGV4LXNocmluazowOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmMDkzZmIgMCUsICNmNTU3NmMgMTAwJSk7IH1cblxuLy8gw6LClMKAw6LClMKAIE1hcmtzIGlubGluZSDDosKUwoDDosKUwoBcbi5tYXJrcy1pbmxpbmUgeyBmb250LXdlaWdodDo2MDA7IGZvbnQtc2l6ZTowLjgxMjVyZW07IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0xKTsgfVxuLm1hcmtzLXNlcCB7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0zKTsgbWFyZ2luOjAgMC4xMjVyZW07IH1cblxuLy8gw6LClMKAw6LClMKAIFBlcmNlbnRhZ2UgYmFkZ2Ugw6LClMKAw6LClMKAXG4ucGN0LWJhZGdlIHsgZGlzcGxheTppbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBwYWRkaW5nOjAuMTg3NXJlbSAwLjVyZW07IGJvcmRlci1yYWRpdXM6MC4zNzVyZW07IGZvbnQtc2l6ZTowLjc1cmVtOyBmb250LXdlaWdodDo3MDA7IGJhY2tncm91bmQ6cmdiYSg5OSwxMDIsMjQxLDAuMDgpOyBjb2xvcjojNjM2NmYxOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBNYW51YWwgcmV2aWV3IHN0YXR1cyDDosKUwoDDosKUwoBcbi5yZXZpZXctc3RhdHVzIHsgZm9udC1zaXplOjAuODEyNXJlbTsgZm9udC13ZWlnaHQ6NTAwOyB9XG4ucmV2aWV3LXN0YXR1cy5yZXZpZXctcGVuZGluZyB7IGNvbG9yOnZhcigtLW9yYW5nZS10ZXh0KTsgZm9udC13ZWlnaHQ6NjAwOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBSZXN1bHQgcGlsbHMgw6LClMKAw6LClMKAXG4ucmVzdWx0LXBpbGwgeyBkaXNwbGF5OmlubGluZS1mbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IHBhZGRpbmc6MC4xODc1cmVtIDAuNjI1cmVtOyBib3JkZXItcmFkaXVzOjFyZW07IGZvbnQtc2l6ZTowLjY4NzVyZW07IGZvbnQtd2VpZ2h0OjcwMDsgbGV0dGVyLXNwYWNpbmc6MC4wM2VtOyB0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7IGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA0KTsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTMpOyB9XG4ucmVzdWx0LXBpbGwucmVzdWx0LXBhc3MgeyBiYWNrZ3JvdW5kOnZhcigtLWdyZWVuLWJnKTsgY29sb3I6dmFyKC0tZ3JlZW4tdGV4dCk7IGJvcmRlcjowLjA2MjVyZW0gc29saWQgdmFyKC0tYmdyZWVuLWJvcmRlcik7IH1cbi5yZXN1bHQtcGlsbC5yZXN1bHQtZmFpbCB7IGJhY2tncm91bmQ6dmFyKC0tcmVkLWJnKTsgY29sb3I6dmFyKC0tcmVkLXRleHQpOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLWJyZWQtYm9yZGVyKTsgfVxuXG4vLyDDosKUwoDDosKUwoAgVGFibGUgd3JhcCBzY3JvbGxiYXIgw6LClMKAw6LClMKAXG4udGFibGUtd3JhcCB7XG4gIHNjcm9sbGJhci13aWR0aDogdGhpbjtcbiAgc2Nyb2xsYmFyLWNvbG9yOiByZ2JhKDk5LDEwMiwyNDEsMC4yKSB0cmFuc3BhcmVudDtcbiAgXG4gICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgaGVpZ2h0OiAwLjM3NXJlbTsgfVxuICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XG4gICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgYmFja2dyb3VuZDogcmdiYSg5OSwxMDIsMjQxLDAuMik7IGJvcmRlci1yYWRpdXM6IDAuMTg3NXJlbTsgfVxuICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7IGJhY2tncm91bmQ6IHJnYmEoOTksMTAyLDI0MSwwLjM1KTsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgQW5hbHl0aWNzIHNlY3Rpb24gw6LClMKAw6LClMKAXG4uYW5hbHl0aWNzLXNlY3Rpb24geyBwYWRkaW5nOjEuMjVyZW07IGRpc3BsYXk6ZmxleDsgZmxleC1kaXJlY3Rpb246Y29sdW1uOyBnYXA6MS4xMjVyZW07IH1cbi5hbmFseXRpY3Mtc2VjdGlvbiAudGFibGUtd3JhcCB7IG1heC1oZWlnaHQ6NjB2aDsgb3ZlcmZsb3c6YXV0bzsgYm9yZGVyLXJhZGl1czowLjYyNXJlbTsgYm94LXNoYWRvdzokc2hhZG93LXNtOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgfVxuXG4vLyDDosKUwoDDosKUwoAgUGFnZXIgw6LClMKAw6LClMKAXG4ucGFnZXIgeyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OmNlbnRlcjsgZ2FwOjFyZW07IHBhZGRpbmc6MC44NzVyZW0gMS4yNXJlbTsgYm9yZGVyLXRvcDowLjA2MjVyZW0gc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBmb250LXNpemU6MC44MTI1cmVtOyBmb250LXdlaWdodDo2MDA7IGxldHRlci1zcGFjaW5nOjAuMDFlbTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0yKSAwJSwgdmFyKC0tYmctMSkgMTAwJSk7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0yKTsgfVxuLnBhZ2VyIHNwYW4geyBwYWRkaW5nOjAuMjVyZW0gMC43NXJlbTsgYm9yZGVyLXJhZGl1czowLjM3NXJlbTsgYmFja2dyb3VuZDp2YXIoLS1iZy0xKTsgYm9yZGVyOjAuMDYyNXJlbSBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IH1cbi5wYWdlciBidXR0b24geyBib3JkZXItcmFkaXVzOjAuNXJlbSAhaW1wb3J0YW50OyBmb250LXdlaWdodDo2MDAgIWltcG9ydGFudDsgcGFkZGluZzowLjM3NXJlbSAxcmVtICFpbXBvcnRhbnQ7IHRyYW5zaXRpb246YmFja2dyb3VuZCAwLjJzICRlYXNlLCBib3gtc2hhZG93IDAuMnMgJGVhc2UsIHRyYW5zZm9ybSAwLjJzICRlYXNlLWJvdW5jZSAhaW1wb3J0YW50OyB9XG4ucGFnZXIgYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpob3ZlciB7IGJveC1zaGFkb3c6JHNoYWRvdy1tZCAhaW1wb3J0YW50OyB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMC4wNjI1cmVtKTsgYmFja2dyb3VuZDp2YXIoLS1iZy0yKSAhaW1wb3J0YW50OyB9XG4ucGFnZXIgYnV0dG9uW2Rpc2FibGVkXSB7IG9wYWNpdHk6MC40OyB9XG5cbkBrZXlmcmFtZXMgc2hpbW1lciB7XG4gIDAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogLTIwMCUgMDsgfVxuICAxMDAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwOyB9XG59XG5cbi5sb2FkZXItcGxhY2Vob2xkZXIgeyBcbiAgcGFkZGluZzogMi41cmVtOyBcbiAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgY29sb3I6IHJnYmEoMCwwLDAsMC41KTsgXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07IFxuICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMCwwLDAsMC4wMikgMjUlLCByZ2JhKDAsMCwwLDAuMDUpIDUwJSwgcmdiYSgwLDAsMCwwLjAyKSA3NSUpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDIwMCUgMTAwJTtcbiAgYW5pbWF0aW9uOiBzaGltbWVyIDEuNXMgaW5maW5pdGU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgbWFyZ2luOiAxcmVtO1xufVxuXG4vLyDDosKUwoDDosKUwoAgV3JvbmctYW5zd2VyIGxpbmsgw6LClMKAw6LClMKAXG4ud3Jvbmctc3VtbWFyeS1saW5rIHsgbWFyZ2luLWxlZnQ6IDAuMzc1cmVtOyBmb250LXNpemU6IDAuODVyZW07IGNvbG9yOiB2YXIoLS1idXR0b24tMSk7IGN1cnNvcjogcG9pbnRlcjsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IHRleHQtdW5kZXJsaW5lLW9mZnNldDogMC4xMjVyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAkZWFzZSwgdHJhbnNmb3JtIDAuMnMgJGVhc2UtYm91bmNlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cbi53cm9uZy1zdW1tYXJ5LWxpbms6aG92ZXIgeyBvcGFjaXR5OiAwLjg7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwLjEyNXJlbSk7IH1cbi53YS1jb3VudC1saW5rIHsgY29sb3I6IHZhcigtLWJ1dHRvbi0xKTsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IHRleHQtdW5kZXJsaW5lLW9mZnNldDogMC4xMjVyZW07IGN1cnNvcjogcG9pbnRlcjsgZm9udC13ZWlnaHQ6IDcwMDsgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzICRlYXNlLCBjb2xvciAwLjJzICRlYXNlOyB9XG4ud2EtY291bnQtbGluazpob3ZlciB7IG9wYWNpdHk6IDAuODU7IH1cbi53YS1hbnN3ZXItbGluayB7IGNvbG9yOiB2YXIoLS1idXR0b24tMSk7IGZvbnQtd2VpZ2h0OiA3MDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzICRlYXNlLCB0cmFuc2Zvcm0gMC4ycyAkZWFzZS1ib3VuY2U7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxuLndhLWFuc3dlci1saW5rOmhvdmVyIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuMDYyNXJlbSk7IH1cbi5tdXRlZCB7IGNvbG9yOiB2YXIoLS10aGVtZS0zLXRleHQtMyk7IGZvbnQtc2l6ZTogMC44NXJlbTsgfVxuXG4vLyDDosKUwoDDosKUwoAgU2hhcmVkIGJhY2tkcm9wICsgcGFuZWwgw6LClMKAw6LClMKAXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7IGZyb20geyBvcGFjaXR5OiAwIH0gdG8geyBvcGFjaXR5OiAxIH0gfVxuQGtleWZyYW1lcyBzbGlkZVVwIHsgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxLjI1cmVtKSBzY2FsZSgwLjk2KSB9IHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEpIH0gfVxuQGtleWZyYW1lcyBzdWJ0bGVQdWxzZSB7IDAlLCAxMDAlIHsgYm94LXNoYWRvdzogMCAxLjVyZW0gMy43NXJlbSB2YXIoLS10aGVtZS0zLWhhbm92ZXItYmcpOyB9IDUwJSB7IGJveC1zaGFkb3c6IDAgMS43NXJlbSA0cmVtIHZhcigtLXRoZW1lLTItaGFub3Zlci1iZyk7IH0gfVxuXG4ud3Jvbmctc3VtbWFyeS1iYWNrZHJvcCB7IHBvc2l0aW9uOiBmaXhlZDsgaW5zZXQ6IDA7IGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGNlbnRlciwgcmdiYSgxNSwgMjMsIDQyLCAwLjU1KSAwJSwgcmdiYSgzMCwgNDEsIDU5LCAwLjc1KSAxMDAlKTsgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMC43NXJlbSkgc2F0dXJhdGUoMTQwJSk7IGJhY2tkcm9wLWZpbHRlcjogYmx1cigwLjc1cmVtKSBzYXR1cmF0ZSgxNDAlKTsgei1pbmRleDogMTAwNTA7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBwYWRkaW5nOiAxLjVyZW07IGFuaW1hdGlvbjogZmFkZUluIDAuMjVzICRlYXNlOyB9XG5cbi53cm9uZy1zdW1tYXJ5LXBhbmVsLFxuLnJlc291cmNlLXBhbmVsIHsgcG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogbWluKDU2cmVtLCA5MnZ3KTsgbWF4LWhlaWdodDogODh2aDsgei1pbmRleDogMTAwNjA7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFuaW1hdGlvbjogc2xpZGVVcCAwLjM1cyAkZWFzZS1ib3VuY2U7IG1hcmdpbjogYXV0bzsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLmNhcmQsXG4ucmVzb3VyY2UtcGFuZWwgLmNhcmQgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXgtaGVpZ2h0OiA4OHZoOyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0xKSAwJSwgdmFyKC0tYmctMikgMTAwJSk7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgYm9yZGVyLXJhZGl1czogMS4yNXJlbTsgYm94LXNoYWRvdzogMCAycmVtIDQuNXJlbSByZ2JhKDE1LCAyMywgNDIsIDAuMjgpLCAwIDAuNzVyZW0gMS41cmVtIHJnYmEoMTUsIDIzLCA0MiwgMC4xMik7IG92ZXJmbG93OiBoaWRkZW47IH1cblxuLy8gw6LClMKAw6LClMKAIFBhbmVsIGhlYWRlciDDosKUwoDDosKUwoBcbi5wYW5lbC1oZWFkZXIgeyBwb3NpdGlvbjpyZWxhdGl2ZTsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBnYXA6MXJlbTsgcGFkZGluZzoxLjI1cmVtIDEuNXJlbTsgYm9yZGVyLWJvdHRvbTowLjA2MjVyZW0gc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLWJnLTIpIDAlLCB2YXIoLS1iZy0xKSAxMDAlKTsgZmxleC1zaHJpbms6MDsgfVxuLnBhbmVsLWhlYWRlcjo6YmVmb3JlIHsgY29udGVudDonJzsgcG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6MDsgdG9wOjA7IGJvdHRvbTowOyB3aWR0aDowLjE4NzVyZW07IGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYnV0dG9uLTEpLCB0cmFuc3BhcmVudCk7IGJvcmRlci1yYWRpdXM6MCAwLjE4NzVyZW0gMC4xODc1cmVtIDA7IH1cbi5wYW5lbC1oZWFkZXIgLmhlYWRlci1pbmZvIHsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDowLjg3NXJlbTsgbWluLXdpZHRoOjA7IGZsZXg6MTsgfVxuLnBhbmVsLWhlYWRlciAuaGVhZGVyLWNvcHkgeyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjAuMTg3NXJlbTsgbWluLXdpZHRoOjA7IH1cbi5wYW5lbC1oZWFkZXIgLmhlYWRlci1pY29uIHsgd2lkdGg6M3JlbTsgaGVpZ2h0OjNyZW07IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyBmbGV4LXNocmluazowOyBib3JkZXItcmFkaXVzOjAuODc1cmVtOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLXRoZW1lLTItaGFub3Zlci1iZykgMCUsIHZhcigtLWJnLTEpIDEwMCUpOyBjb2xvcjp2YXIoLS1idXR0b24tMSk7IGJveC1zaGFkb3c6MCAwLjVyZW0gMS4yNXJlbSB2YXIoLS10aGVtZS0zLWhhbm92ZXItYmcpLCBpbnNldCAwIDAgMCAwLjA2MjVyZW0gdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyB9XG4ucGFuZWwtaGVhZGVyIC5oZWFkZXItaWNvbiBtYXQtaWNvbiB7IGZvbnQtc2l6ZToxLjM3NXJlbTsgd2lkdGg6MS4zNzVyZW07IGhlaWdodDoxLjM3NXJlbTsgfVxuLnBhbmVsLWhlYWRlciBoNCB7IG1hcmdpbjowOyBmb250LXNpemU6MS4wNjI1cmVtOyBmb250LXdlaWdodDo4MDA7IGxldHRlci1zcGFjaW5nOi0wLjAyZW07IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0xKTsgfVxuLnBhbmVsLWhlYWRlciAucGFuZWwtc3ViIHsgZm9udC1zaXplOjAuODEyNXJlbTsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTMpOyBtYXJnaW4tdG9wOjA7IGxpbmUtaGVpZ2h0OjEuNDsgfVxuLnBhbmVsLWhlYWRlciBidXR0b25bbWF0LWljb24tYnV0dG9uXSB7IHdpZHRoOjIuNXJlbTsgaGVpZ2h0OjIuNXJlbTsgYm9yZGVyLXJhZGl1czowLjc1cmVtOyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIDAuMnMgJGVhc2UsIHRyYW5zZm9ybSAwLjJzICRlYXNlLWJvdW5jZSwgYm9yZGVyLWNvbG9yIDAuMnMgJGVhc2UsIGNvbG9yIDAuMnMgJGVhc2U7IGZsZXgtc2hyaW5rOjA7IH1cbi5wYW5lbC1oZWFkZXIgYnV0dG9uW21hdC1pY29uLWJ1dHRvbl06aG92ZXIgeyBiYWNrZ3JvdW5kOnZhcigtLXRoZW1lLTItaGFub3Zlci1iZyk7IGJvcmRlci1jb2xvcjp2YXIoLS1idXR0b24tMSk7IGNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgdHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyk7IH1cblxuLy8gw6LClMKAw6LClMKAIFBhbmVsIGJvZHkgw6LClMKAw6LClMKAXG4ud3Jvbmctc3VtbWFyeS1wYW5lbCAucGFuZWwtYm9keSB7IHBhZGRpbmc6MS4xMjVyZW0gMS4zNzVyZW07IG92ZXJmbG93OmF1dG87IGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYmctMSkgMCUsIHZhcigtLWJnLTIpIDEwMCUpOyB9XG4ud3Jvbmctc3VtbWFyeS1wYW5lbCAucXVlc3Rpb24tdGl0bGUgeyBmb250LXdlaWdodDo3MDA7IG1hcmdpbi1ib3R0b206MC44NzVyZW07IGZvbnQtc2l6ZTowLjkzNzVyZW07IGxldHRlci1zcGFjaW5nOi0wLjAxZW07IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0xKTsgcGFkZGluZzowLjg3NXJlbSAxcmVtOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgYm9yZGVyLXJhZGl1czowLjg3NXJlbTsgYmFja2dyb3VuZDp2YXIoLS1iZy0xKTsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnNtYWxsLW11dGVkIHsgZm9udC1zaXplOjAuNjg3NXJlbTsgcGFkZGluZy1sZWZ0OjA7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0zKTsgfVxuXG4vLyDDosKUwoDDosKUwoAgU3VtbWFyeSB0YWJsZSDDosKUwoDDosKUwoBcbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHsgd2lkdGg6MTAwJTsgYm9yZGVyLWNvbGxhcHNlOnNlcGFyYXRlOyBib3JkZXItc3BhY2luZzowIDAuNXJlbTsgbWFyZ2luOjAgYXV0bzsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGhlYWQgdGggeyB0ZXh0LWFsaWduOmNlbnRlcjsgcGFkZGluZzowLjc1cmVtIDFyZW07IGZvbnQtd2VpZ2h0OjcwMDsgZm9udC1zaXplOjAuNzVyZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6MC4wNmVtOyBjb2xvcjp2YXIoLS10aGVtZS0xLXRleHQtMSk7IGJhY2tncm91bmQ6dmFyKC0tdGFibGUtaGVhZGVyLWJnKTsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGhlYWQgdGg6Zmlyc3QtY2hpbGQgeyBib3JkZXItcmFkaXVzOjAuNjI1cmVtIDAgMCAwLjYyNXJlbTsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGhlYWQgdGg6bGFzdC1jaGlsZCB7IGJvcmRlci1yYWRpdXM6MCAwLjYyNXJlbSAwLjYyNXJlbSAwOyB9XG4ud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0Ym9keSB0ciB7IGJhY2tncm91bmQ6dHJhbnNwYXJlbnQ7IHRyYW5zaXRpb246dHJhbnNmb3JtIDAuMTVzICRlYXNlOyB9XG4ud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0Ym9keSB0cjpob3ZlciB7IHRyYW5zZm9ybTp0cmFuc2xhdGVZKC0wLjEyNXJlbSk7IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRib2R5IHRkIHsgcGFkZGluZzowLjg3NXJlbSAxcmVtOyB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7IHRleHQtYWxpZ246Y2VudGVyOyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgdHJhbnNpdGlvbjpib3JkZXItY29sb3IgMC4xNXMgJGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgJGVhc2UsIGJhY2tncm91bmQgMC4xNXMgJGVhc2U7IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRib2R5IHRkOmZpcnN0LWNoaWxkIHsgYm9yZGVyLXJhZGl1czowLjYyNXJlbSAwIDAgMC42MjVyZW07IHRleHQtYWxpZ246bGVmdDsgZm9udC13ZWlnaHQ6NjAwOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMSk7IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRib2R5IHRkOmxhc3QtY2hpbGQgeyBib3JkZXItcmFkaXVzOjAgMC42MjVyZW0gMC42MjVyZW0gMDsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGJvZHkgdHI6aG92ZXIgdGQgeyBib3JkZXItY29sb3I6dmFyKC0tYnV0dG9uLTEpOyBiYWNrZ3JvdW5kOnZhcigtLWJnLTIpOyBib3gtc2hhZG93OjAgMC41cmVtIDEuMjVyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKTsgfVxuLndhLWFuc3dlci1saW5rLCAud2EtY291bnQtbGluayB7IGNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgZm9udC13ZWlnaHQ6NjAwOyB0cmFuc2l0aW9uOm9wYWNpdHkgMC4xNXMgJGVhc2U7IH1cbi53YS1hbnN3ZXItbGluazpob3ZlciwgLndhLWNvdW50LWxpbms6aG92ZXIgeyBvcGFjaXR5OjAuNzU7IHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7IHRleHQtdW5kZXJsaW5lLW9mZnNldDowLjEyNXJlbTsgfVxuXG4vLyDDosKUwoDDosKUwoAgU3VtbWFyeSBhY3Rpb25zIMOiwpTCgMOiwpTCgFxuLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktYWN0aW9ucyxcbi5zdW1tYXJ5LWFjdGlvbnMgeyBkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpmbGV4LWVuZDsgZ2FwOjAuNXJlbTsgcGFkZGluZzowLjg3NXJlbSAxLjM3NXJlbTsgYm9yZGVyLXRvcDowLjA2MjVyZW0gc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLWJnLTIpIDAlLCB2YXIoLS1iZy0xKSAxMDAlKTsgfVxuLnN1bW1hcnktYWN0aW9ucyBidXR0b24geyBib3JkZXItcmFkaXVzOjAuNjI1cmVtICFpbXBvcnRhbnQ7IGZvbnQtd2VpZ2h0OjcwMCAhaW1wb3J0YW50OyB0cmFuc2l0aW9uOmJhY2tncm91bmQgMC4xNXMgJGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgJGVhc2UsIHRyYW5zZm9ybSAwLjE1cyAkZWFzZSAhaW1wb3J0YW50OyB9XG4uc3VtbWFyeS1hY3Rpb25zIGJ1dHRvbjpob3ZlciB7IHRyYW5zZm9ybTp0cmFuc2xhdGVZKC0wLjA2MjVyZW0pOyBib3gtc2hhZG93OjAgMC43NXJlbSAxLjVyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKSAhaW1wb3J0YW50OyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBSZXNvdXJjZSBwYW5lbCDDosKUwoDDosKUwoBcbi5yZXNvdXJjZS1wYW5lbCAucGFuZWwtYm9keSwgLndyb25nLXN1bW1hcnktcGFuZWwgLnJlc291cmNlLWxpc3QgeyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjAuNzVyZW07IH1cbi5yZXNvdXJjZS1saXN0IHsgbGlzdC1zdHlsZTpub25lOyBwYWRkaW5nOjA7IG1hcmdpbjowOyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjAuNzVyZW07IH1cbi5yZXNvdXJjZS1saXN0IGxpIHsgcGFkZGluZzowLjg3NXJlbSAxcmVtOyBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLWJnLTEpIDAlLCB2YXIoLS1iZy0yKSAxMDAlKTsgYm9yZGVyLXJhZGl1czowLjg3NXJlbTsgZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MC43NXJlbTsgYm9yZGVyOjAuMDYyNXJlbSBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IHRyYW5zaXRpb246Ym94LXNoYWRvdyAwLjI1cyAkZWFzZSwgdHJhbnNmb3JtIDAuMjVzICRlYXNlLWJvdW5jZSwgYm9yZGVyLWNvbG9yIDAuMjVzICRlYXNlOyB9XG4ucmVzb3VyY2UtbGlzdCBsaTpob3ZlciB7IGJveC1zaGFkb3c6MCAxcmVtIDJyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKTsgdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTAuMTI1cmVtKTsgYm9yZGVyLWNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgfVxuLnJlcy10aXRsZSB7IGZvbnQtd2VpZ2h0OjcwMDsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTEpOyBsZXR0ZXItc3BhY2luZzotMC4wMWVtOyB9XG4ucmVzLWRlc2MgeyBmb250LXNpemU6MC44MTI1cmVtOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMyk7IH1cbi5yZXMtYWN0aW9ucyBhIHsgYmFja2dyb3VuZDogdmFyKC0tYnV0dG9uLTEpOyBjb2xvcjogdmFyKC0tYnV0dG9uLXRleHQtMSk7IHBhZGRpbmc6IDAuMzc1cmVtIDAuNzVyZW07IGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZvbnQtc2l6ZTogMC44MTI1cmVtOyBmb250LXdlaWdodDogNjAwOyB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzICRlYXNlLCBib3gtc2hhZG93IDAuMTVzICRlYXNlOyB9XG4ucmVzLWFjdGlvbnMgYTpob3ZlciB7IG9wYWNpdHk6IDAuOTsgYm94LXNoYWRvdzogJHNoYWRvdy1zbTsgfVxuXG4vLyDDosKUwoDDosKUwoAgU2Nyb2xsYmFyIMOiwpTCgMOiwpTCgFxuLndyb25nLXN1bW1hcnktcGFuZWwgLnBhbmVsLWJvZHksXG4ucmVzb3VyY2UtcGFuZWwgLnBhbmVsLWJvZHksXG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWJvZHkgeyBvdmVyZmxvdzogYXV0bzsgfVxuLndyb25nLXN1bW1hcnktcGFuZWwgLnBhbmVsLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLnJlc291cmNlLXBhbmVsIC5wYW5lbC1ib2R5Ojotd2Via2l0LXNjcm9sbGJhcixcbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIgeyBoZWlnaHQ6IDAuMzc1cmVtOyB3aWR0aDogMC4zNzVyZW07IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5wYW5lbC1ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayxcbi5yZXNvdXJjZS1wYW5lbCAucGFuZWwtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2ssXG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5wYW5lbC1ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5yZXNvdXJjZS1wYW5lbCAucGFuZWwtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBib3JkZXItcmFkaXVzOiAwLjE4NzVyZW07IH1cbi53cm9uZy1zdW1tYXJ5LXBhbmVsIC5wYW5lbC1ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3Zlcixcbi5yZXNvdXJjZS1wYW5lbCAucGFuZWwtYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIsXG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtMy10ZXh0LTMpOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBVc2VyIFJldmlldyBQYW5lbCDDosKUwoDDosKUwoBcbi51c2VyLXJldmlldy1wYW5lbCB7IHdpZHRoOiBtaW4oNzJyZW0sIDk0dncpOyBtYXgtaGVpZ2h0OiA5MHZoOyBtYXJnaW46IGF1dG87IH1cbi51c2VyLXJldmlldy1wYW5lbCAuY2FyZCB7IGRpc3BsYXk6ZmxleDsgZmxleC1kaXJlY3Rpb246Y29sdW1uOyBtYXgtaGVpZ2h0Ojkwdmg7IGJvcmRlci1yYWRpdXM6MS4yNXJlbTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0xKSAwJSwgdmFyKC0tYmctMikgMTAwJSk7IGJveC1zaGFkb3c6MCAycmVtIDQuNXJlbSByZ2JhKDE1LCAyMywgNDIsIDAuMjgpLCAwIDAuNzVyZW0gMS41cmVtIHJnYmEoMTUsIDIzLCA0MiwgMC4xMik7IGJvcmRlcjowLjA2MjVyZW0gc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyBvdmVyZmxvdzpoaWRkZW47IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyIHsgcG9zaXRpb246cmVsYXRpdmU7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgZ2FwOjFyZW07IHBhZGRpbmc6MS4yNXJlbSAxLjVyZW07IGJvcmRlci1ib3R0b206MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1iZy0yKSAwJSwgdmFyKC0tYmctMSkgMTAwJSk7IGZsZXgtc2hyaW5rOjA7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyOjpiZWZvcmUgeyBjb250ZW50OicnOyBwb3NpdGlvbjphYnNvbHV0ZTsgbGVmdDowOyB0b3A6MDsgYm90dG9tOjA7IHdpZHRoOjAuMTg3NXJlbTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1idXR0b24tMSksIHRyYW5zcGFyZW50KTsgYm9yZGVyLXJhZGl1czowIDAuMTg3NXJlbSAwLjE4NzVyZW0gMDsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1oZWFkZXIgLmhlYWRlci1pbmZvIHsgZGlzcGxheTpmbGV4OyBmbGV4LWRpcmVjdGlvbjpjb2x1bW47IGdhcDowLjVyZW07IGZsZXg6MTsgbWluLXdpZHRoOjA7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyIC5oZWFkZXItaWNvbiB7IHdpZHRoOjNyZW07IGhlaWdodDozcmVtOyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OmNlbnRlcjsgYm9yZGVyLXJhZGl1czowLjg3NXJlbTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS10aGVtZS0yLWhhbm92ZXItYmcpIDAlLCB2YXIoLS1iZy0xKSAxMDAlKTsgY29sb3I6dmFyKC0tYnV0dG9uLTEpOyBib3gtc2hhZG93OjAgMC41cmVtIDEuMjVyZW0gdmFyKC0tdGhlbWUtMy1oYW5vdmVyLWJnKSwgaW5zZXQgMCAwIDAgMC4wNjI1cmVtIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgZmxleC1zaHJpbms6MDsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1oZWFkZXIgLmhlYWRlci1pY29uIG1hdC1pY29uIHsgZm9udC1zaXplOjEuMzc1cmVtOyB3aWR0aDoxLjM3NXJlbTsgaGVpZ2h0OjEuMzc1cmVtOyB9XG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWhlYWRlciBoNCB7IG1hcmdpbjowOyBmb250LXNpemU6MS4xMjVyZW07IGZvbnQtd2VpZ2h0OjgwMDsgbGV0dGVyLXNwYWNpbmc6LTAuMDJlbTsgY29sb3I6dmFyKC0tdGhlbWUtMy10ZXh0LTEpOyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjAuNXJlbTsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1oZWFkZXIgaDMgeyBtYXJnaW46MDsgZm9udC1zaXplOjAuODEyNXJlbTsgZm9udC13ZWlnaHQ6NTAwOyBjb2xvcjp2YXIoLS10aGVtZS0zLXRleHQtMyk7IGRpc3BsYXk6aW5saW5lLWZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjAuNXJlbTsgZmxleC13cmFwOndyYXA7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyIC5zY29yZSB7IGNvbG9yOnZhcigtLXRoZW1lLTMtdGV4dC0yKTsgZm9udC13ZWlnaHQ6NjAwOyBwYWRkaW5nOjAuMjVyZW0gMC42MjVyZW07IGJvcmRlci1yYWRpdXM6MC41cmVtOyBiYWNrZ3JvdW5kOnZhcigtLWJnLTEpOyBib3JkZXI6MC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgZm9udC1zaXplOjAuODEyNXJlbTsgbGV0dGVyLXNwYWNpbmc6MC4wMWVtOyB9XG4udXNlci1yZXZpZXctcGFuZWwgLnBhbmVsLWhlYWRlciAucmVzdWx0IHsgZm9udC13ZWlnaHQ6NzAwOyBwYWRkaW5nOjAuMjVyZW0gMC43NXJlbTsgYm9yZGVyLXJhZGl1czo2Mi41cmVtOyBmb250LXNpemU6MC43NXJlbTsgbGV0dGVyLXNwYWNpbmc6MC4wNGVtOyB0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7IGJveC1zaGFkb3c6MCAwLjEyNXJlbSAwLjVyZW0gcmdiYSgxNSwyMyw0MiwwLjA4KTsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1oZWFkZXIgLnJlc3VsdC5wYXNzIHsgY29sb3I6IHZhcigtLWJ1dHRvbi10ZXh0LTEpOyBiYWNrZ3JvdW5kOiB2YXIoLS1idXR0b24tMSk7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyIC5yZXN1bHQuZmFpbCB7IGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS0zLXRleHQtMyk7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtaGVhZGVyIGJ1dHRvblttYXQtaWNvbi1idXR0b25dIHsgd2lkdGg6Mi41cmVtOyBoZWlnaHQ6Mi41cmVtOyBib3JkZXItcmFkaXVzOjAuNzVyZW07IGJhY2tncm91bmQ6dmFyKC0tYmctMSk7IGJvcmRlcjowLjA2MjVyZW0gc29saWQgdmFyKC0tdGhlbWUtMy1ib3JkZXIpOyB0cmFuc2l0aW9uOmJhY2tncm91bmQgMC4ycyAkZWFzZSwgYm9yZGVyLWNvbG9yIDAuMnMgJGVhc2UsIHRyYW5zZm9ybSAwLjJzICRlYXNlLWJvdW5jZSwgY29sb3IgMC4ycyAkZWFzZTsgZmxleC1zaHJpbms6MDsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1oZWFkZXIgYnV0dG9uW21hdC1pY29uLWJ1dHRvbl06aG92ZXIgeyBiYWNrZ3JvdW5kOnZhcigtLXRoZW1lLTItaGFub3Zlci1iZyk7IGJvcmRlci1jb2xvcjp2YXIoLS1idXR0b24tMSk7IGNvbG9yOnZhcigtLWJ1dHRvbi0xKTsgdHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyk7IH1cbi51c2VyLXJldmlldy1wYW5lbCAucGFuZWwtc3ViIHsgY29sb3I6IHZhcigtLXRoZW1lLTMtdGV4dC0zKTsgZm9udC1zaXplOiAwLjg3NXJlbTsgfVxuLnVzZXItcmV2aWV3LXBhbmVsIC5wYW5lbC1ib2R5IHsgZmxleDoxOyBvdmVyZmxvdzphdXRvOyBtYXgtaGVpZ2h0OiBjYWxjKDkwdmggLSAxMHJlbSk7IHBhZGRpbmc6IDEuNXJlbTsgfVxuXG4vLyDDosKUwoDDosKUwoAgQXR0ZW1wdCBoZWFkZXIgw6LClMKAw6LClMKAXG4uYXR0ZW1wdC1oZWFkZXIgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDAuMzc1cmVtOyBwYWRkaW5nOiAwLjc1cmVtIDA7IGJvcmRlci1ib3R0b206IDAuMDYyNXJlbSBzb2xpZCByZ2JhKDAsMCwwLDAuMDYpOyBtYXJnaW4tYm90dG9tOiAwLjg3NXJlbTsgfVxuLmF0dGVtcHQtaGVhZGVyIGg1IHsgbWFyZ2luOiAwOyBmb250LXNpemU6IDFyZW07IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMC43NXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgbGV0dGVyLXNwYWNpbmc6IC0wLjAxZW07IH1cbi5hdHRlbXB0LWhlYWRlciAuc2NvcmUtYmFkZ2UgeyBiYWNrZ3JvdW5kOiAjZTlmN2VmOyBjb2xvcjogIzBhODA0MzsgcGFkZGluZzogMC4zNzVyZW0gMC43NXJlbTsgYm9yZGVyLXJhZGl1czogJHJhZGl1czsgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAwLjg3NXJlbTsgbWFyZ2luLWxlZnQ6IGF1dG87IGxldHRlci1zcGFjaW5nOiAwLjAxZW07IH1cbi5hdHRlbXB0LW1ldGEgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IDAuNzVyZW07IGNvbG9yOiByZ2JhKDAsMCwwLDAuNTUpOyBmb250LXNpemU6IDAuODEyNXJlbTsgfVxuXG4vLyDDosKUwoDDosKUwoAgUXVlc3Rpb24gcmV2aWV3IGNhcmRzIMOiwpTCgMOiwpTCgFxuLnF1ZXN0aW9ucy1saXN0IHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxcmVtOyBtYXJnaW4tdG9wOiAwLjVyZW07IH1cbi5xdWVzdGlvbi1yZXZpZXctY2FyZCB7IHBvc2l0aW9uOnJlbGF0aXZlOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IGJvcmRlci1yYWRpdXM6IDAuODc1cmVtOyBwYWRkaW5nOiAxLjI1cmVtIDEuNXJlbTsgYmFja2dyb3VuZDogdmFyKC0tYmctMSk7IHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4yNXMgJGVhc2UsIHRyYW5zZm9ybSAwLjI1cyAkZWFzZS1ib3VuY2UsIGJvcmRlci1jb2xvciAwLjI1cyAkZWFzZTsgYm94LXNoYWRvdzogMCAwLjEyNXJlbSAwLjM3NXJlbSByZ2JhKDE1LDIzLDQyLDAuMDMpOyBvdmVyZmxvdzpoaWRkZW47IH1cbi5xdWVzdGlvbi1yZXZpZXctY2FyZDo6YmVmb3JlIHsgY29udGVudDonJzsgcG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6MDsgdG9wOjA7IGJvdHRvbTowOyB3aWR0aDowLjE4NzVyZW07IGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYnV0dG9uLTEpIDAlLCByZ2JhKDk5LDEwMiwyNDEsMC40KSAxMDAlKTsgfVxuLnF1ZXN0aW9uLXJldmlldy1jYXJkOmhvdmVyIHsgYm94LXNoYWRvdzogMCAwLjc1cmVtIDEuNzVyZW0gcmdiYSgxNSwyMyw0MiwwLjA4KTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjEyNXJlbSk7IGJvcmRlci1jb2xvcjogcmdiYSg5OSwxMDIsMjQxLDAuMjUpOyB9XG4ucXVlc3Rpb24tcmV2aWV3LWNhcmQgLnEtdGV4dCB7IGZvbnQtd2VpZ2h0OiA1MDA7IGxpbmUtaGVpZ2h0OiAxLjU1OyBjb2xvcjogdmFyKC0tdGhlbWUtMy10ZXh0LTEpOyB9XG4ucXVlc3Rpb24tcmV2aWV3LWNhcmQgLm1hcmstYmFkZ2UgeyBmbG9hdDogcmlnaHQ7IGJhY2tncm91bmQ6ICNmZmYzZjM7IGNvbG9yOiB2YXIoLS1yZWQtdGV4dCk7IHBhZGRpbmc6IDAuMzc1cmVtIDAuNXJlbTsgYm9yZGVyLXJhZGl1czogMC41cmVtOyBmb250LXdlaWdodDogNjAwOyBmb250LXNpemU6IDAuNzVyZW07IH1cblxuLnEtaGVhZC1yb3cgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBnYXA6IDFyZW07IG1hcmdpbi1ib3R0b206IDFyZW07IHBhZGRpbmctYm90dG9tOiAxcmVtOyBib3JkZXItYm90dG9tOiAwLjA2MjVyZW0gZGFzaGVkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgfVxuLnEtbGVmdCB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMC44NzVyZW07IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBmbGV4OiAxOyBtaW4td2lkdGg6IDA7IH1cbi5xLWJvZHkgeyBkaXNwbGF5OiBncmlkOyBnYXA6IDAuNXJlbTsgZmxleDogMTsgbWluLXdpZHRoOiAwOyB9XG4ucS1tZXRhIHsgZGlzcGxheTogZmxleDsgZ2FwOiAwLjVyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGZsZXgtd3JhcDogd3JhcDsgfVxuLnEtaW5kZXggeyB3aWR0aDogMi4yNXJlbTsgaGVpZ2h0OiAyLjI1cmVtOyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDk5LDEwMiwyNDEsMC4xOCkgMCUsIHJnYmEoOTksMTAyLDI0MSwwLjA2KSAxMDAlKTsgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgcmdiYSg5OSwxMDIsMjQxLDAuMTgpOyBib3JkZXItcmFkaXVzOiAwLjYyNXJlbTsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGZvbnQtd2VpZ2h0OiA4MDA7IGZvbnQtc2l6ZTogMC44NzVyZW07IGNvbG9yOiB2YXIoLS1idXR0b24tMSk7IGZsZXgtc2hyaW5rOiAwOyB9XG4ucS1yaWdodCB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMC42MjVyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGZsZXgtc2hyaW5rOiAwOyB9XG4ucS1iYWRnZSB7IGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLTItaGFub3Zlci1iZyk7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgY29sb3I6IHZhcigtLWJ1dHRvbi0xKTsgYm9yZGVyLXJhZGl1czogMC41cmVtOyBwYWRkaW5nOiAwLjI1cmVtIDAuNjI1cmVtOyBmb250LXNpemU6IDAuNjg3NXJlbTsgbGluZS1oZWlnaHQ6IDFyZW07IHdpZHRoOiBmaXQtY29udGVudDsgZm9udC13ZWlnaHQ6IDcwMDsgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgfVxuLnEtaW5mbyB7IGNvbG9yOiB2YXIoLS10aGVtZS0zLXRleHQtMyk7IGZvbnQtc2l6ZTogMC44MTI1cmVtOyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAwLjM3NXJlbTsgZm9udC13ZWlnaHQ6IDUwMDsgfVxuLnEtaW5mbyBtYXQtaWNvbiB7IGZvbnQtc2l6ZTogMC45Mzc1cmVtOyB3aWR0aDogMC45Mzc1cmVtOyBoZWlnaHQ6IDAuOTM3NXJlbTsgY29sb3I6IHZhcigtLWJ1dHRvbi0xKTsgfVxuLnEtbWFya3Muc21hbGwtbXV0ZWQgeyBjb2xvcjogcmdiYSgwLDAsMCwwLjYpOyBmb250LXNpemU6IDAuODc1cmVtOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBRdWVzdGlvbiBvcHRpb25zIChjaG9vc2UgLyBtdWx0aSkgw6LClMKAw6LClMKAXG4ucS1vcHRpb25zIHsgZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyBnYXA6IDAuNjI1cmVtOyB9XG4ucS1vcHRpb25zLnR3by1jb2wgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IGdhcDogMC43NXJlbTsgfVxuLnEtb3B0aW9uIHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAwLjc1cmVtOyBwYWRkaW5nOiAwLjc1cmVtIDAuODc1cmVtOyBib3JkZXItcmFkaXVzOiAwLjVyZW07IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHJnYmEoMCwwLDAsMC4xKTsgYmFja2dyb3VuZDogI2Y4ZmJmZjsgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjI1cyAkZWFzZSwgYmFja2dyb3VuZCAwLjI1cyAkZWFzZSwgdHJhbnNmb3JtIDAuMjVzICRlYXNlLWJvdW5jZSwgYm9yZGVyLWNvbG9yIDAuMjVzICRlYXNlOyB9XG4ucS1vcHRpb246aG92ZXIgeyBib3gtc2hhZG93OiAkc2hhZG93LW1kOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMTI1cmVtKTsgYm9yZGVyLWNvbG9yOiByZ2JhKDk5LDEwMiwyNDEsMC4xNSk7IH1cbi5vcHQtbGVmdCB7IHdpZHRoOiAyLjVyZW07IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBmbGV4LXNocmluazogMDsgfVxuLm9wdC1sZWZ0IC5vcHQtbWFyayB7IHdpZHRoOiAycmVtOyBoZWlnaHQ6IDJyZW07IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjA1KTsgZGlzcGxheTogaW5saW5lLWZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDAuODEyNXJlbTsgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cyAkZWFzZTsgfVxuLm9wdC1ib2R5IHsgZmxleDogMTsgcGFkZGluZy1yaWdodDogMC43NXJlbTsgYWxpZ24tc2VsZjogY2VudGVyOyBsaW5lLWhlaWdodDogMS40NTsgfVxuLm9wdC1iYWRnZSB7IG1hcmdpbi1sZWZ0OiBhdXRvOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDAuMzc1cmVtOyBmbGV4LXNocmluazogMDsgfVxuLmJhZGdlIHsgcGFkZGluZzogMC4yNXJlbSAwLjYyNXJlbTsgYm9yZGVyLXJhZGl1czogMXJlbTsgZm9udC1zaXplOiAwLjY4NzVyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IHdoaXRlLXNwYWNlOiBub3dyYXA7IGxldHRlci1zcGFjaW5nOiAwLjAyZW07IH1cbi5iYWRnZS55b3VyLWFuc3dlciB7IGJhY2tncm91bmQ6IHZhcigtLXJlZC1iZyk7IGNvbG9yOiB2YXIoLS1yZWQtdGV4dCk7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLWJyZWQtYm9yZGVyKTsgfVxuLmJhZGdlLmNvcnJlY3QgeyBiYWNrZ3JvdW5kOiAjZThmOWVmOyBjb2xvcjogdmFyKC0tZ3JlZW4tdGV4dCk7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLWJncmVlbi1ib3JkZXIpOyB9XG4uYmFkZ2UubWlzc2VkIHsgYmFja2dyb3VuZDogdmFyKC0tYmx1ZS1iZyk7IGNvbG9yOiB2YXIoLS1iYmx1ZS10ZXh0KTsgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgdmFyKC0tYmJsdWUtYm9yZGVyKTsgfVxuLnEtb3B0aW9uLnNlbGVjdGVkIHsgYmFja2dyb3VuZDogdmFyKC0tcmVkLWJnKTsgY29sb3I6IHZhcigtLXJlZC10ZXh0KTsgYm9yZGVyLWNvbG9yOiB2YXIoLS1icmVkLWJvcmRlcik7IH1cbi5xLW9wdGlvbi5zZWxlY3RlZCAub3B0LW1hcmsgeyBiYWNrZ3JvdW5kOiByZ2JhKDE4NSwyOCwyOCwwLjEpOyB9XG4ucS1vcHRpb24uY29ycmVjdCB7IGJhY2tncm91bmQ6IHZhcigtLWdyZWVuLWJnKTsgY29sb3I6IHZhcigtLWdyZWVuLXRleHQpOyBib3JkZXItY29sb3I6IHZhcigtLWJncmVlbi1ib3JkZXIpOyB9XG4ucS1vcHRpb24uY29ycmVjdCAub3B0LW1hcmsgeyBiYWNrZ3JvdW5kOiByZ2JhKDIyLDEwMSw1MiwwLjEpOyB9XG4ucS1vcHRpb24ubWlzc2VkIHsgYmFja2dyb3VuZDogdmFyKC0tYmx1ZS1iZyk7IGNvbG9yOiB2YXIoLS1iYmx1ZS10ZXh0KTsgYm9yZGVyLWNvbG9yOiB2YXIoLS1iYmx1ZS1ib3JkZXIpOyB9XG4ucS1vcHRpb24ubWlzc2VkIC5vcHQtbWFyayB7IGJhY2tncm91bmQ6IHJnYmEoMTEsMTAyLDIwOCwwLjEpOyB9XG5cbi5xLXNlbGVjdGVkLCAucS1tYXJrcyB7IG1hcmdpbi10b3A6IDAuNXJlbTsgZm9udC1zaXplOiAwLjg3NXJlbTsgfVxuLnEtZmVlZGJhY2sgeyBtYXJnaW4tdG9wOiAwLjYyNXJlbTsgYmFja2dyb3VuZDogcmdiYSgyNDAsMjQ4LDI1NSwwLjYpOyBwYWRkaW5nOiAwLjYyNXJlbSAwLjc1cmVtOyBib3JkZXItcmFkaXVzOiAwLjVyZW07IGNvbG9yOiByZ2JhKDAsMCwwLDAuNzUpOyBib3JkZXItbGVmdDogMC4xODc1cmVtIHNvbGlkIHZhcigtLWJibHVlLWJvcmRlcik7IGxpbmUtaGVpZ2h0OiAxLjU7IH1cblxuLy8gw6LClMKAw6LClMKAIE1hcmtzIGJhZGdlIHN0YXRlcyDDosKUwoDDosKUwoBcbi5xLW1hcmtzLm1hcmstcG9zaXRpdmUgeyBiYWNrZ3JvdW5kOiAjZThmOWVmOyBjb2xvcjogIzBiOGE0NTsgcGFkZGluZzogMC4zNzVyZW0gMC43NXJlbTsgYm9yZGVyLXJhZGl1czogMXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAwLjgxMjVyZW07IGxldHRlci1zcGFjaW5nOiAwLjAxZW07IH1cbi5xLW1hcmtzLm1hcmstbmVnYXRpdmUgeyBiYWNrZ3JvdW5kOiAjZmZmMmY0OyBjb2xvcjogI2IwMmEzNzsgcGFkZGluZzogMC4zNzVyZW0gMC43NXJlbTsgYm9yZGVyLXJhZGl1czogMXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAwLjgxMjVyZW07IGxldHRlci1zcGFjaW5nOiAwLjAxZW07IH1cbi5xLW1hcmtzLm1hcmstbWlkIHsgYmFja2dyb3VuZDogI2ZmZjhlNjsgY29sb3I6ICNiMzZhMDA7IHBhZGRpbmc6IDAuMzc1cmVtIDAuNzVyZW07IGJvcmRlci1yYWRpdXM6IDFyZW07IGZvbnQtd2VpZ2h0OiA3MDA7IGZvbnQtc2l6ZTogMC44MTI1cmVtOyBsZXR0ZXItc3BhY2luZzogMC4wMWVtOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBGaWxsIHF1ZXN0aW9uIMOiwpTCgMOiwpTCgFxuLnEtZmlsbCAuZmlsbC1yb3cgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IDAuNzVyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGZsZXgtd3JhcDogd3JhcDsgfVxuLnEtZmlsbCAuZmlsbC1vcHRpb24geyBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTsgYm9yZGVyLXJhZGl1czogMC41cmVtOyBiYWNrZ3JvdW5kOiAjZmZmN2VkOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCByZ2JhKDI0NSwxNjYsMzUsMC4xKTsgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjE1cyAkZWFzZTsgfVxuLnEtZmlsbCAuZmlsbC1vcHRpb246aG92ZXIgeyBib3gtc2hhZG93OiAkc2hhZG93LXNtOyB9XG4ucS1maWxsIC5maWxsLW9wdGlvbi5zZWxlY3RlZCB7IGJhY2tncm91bmQ6ICNlOGY2ZmY7IGJvcmRlci1jb2xvcjogcmdiYSgyLDExMiwyNTUsMC4xNSk7IH1cbi5xLWZpbGwgLmZpbGwtb3B0aW9uLmNvcnJlY3QgeyBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi1iZyk7IGJvcmRlci1jb2xvcjogdmFyKC0tYmdyZWVuLWJvcmRlcik7IH1cbi5xLWZpbGwgLmZpbGwtY29ycmVjdCB7IHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtOyBib3JkZXItcmFkaXVzOiAwLjVyZW07IGNvbG9yOiByZ2JhKDAsMCwwLDAuNik7IGZvbnQtc2l6ZTogMC44MTI1cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmVlbi1iZyk7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLWJncmVlbi1ib3JkZXIpOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBEZXNjcmlwdGl2ZSByZXZpZXcgw6LClMKAw6LClMKAXG4ucS1kZXNjcmlwdGl2ZSB7IGRpc3BsYXk6IGdyaWQ7IGdhcDogMC44NzVyZW07IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLWhlYWRlciB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgZ2FwOiAwLjc1cmVtOyBtYXJnaW4tYm90dG9tOiAwLjYyNXJlbTsgcGFkZGluZzogMC43NXJlbTsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmx1ZS1iZyk7IGJvcmRlci1yYWRpdXM6IDAuNjI1cmVtOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS1iYmx1ZS1ib3JkZXIpOyB9XG4ucS1kZXNjcmlwdGl2ZSAuZGVzYy1oZWFkZXIgLmRlc2MtcXVlc3Rpb24geyBmbGV4OiAxIDEgYXV0bzsgfVxuLnEtZGVzY3JpcHRpdmUgLmRlc2MtaGVhZGVyIC5xdWVzdGlvbi1sYWJlbCB7IGZvbnQtc2l6ZTogMC42ODc1cmVtOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4wNmVtOyBjb2xvcjogIzhjNmFkNjsgYmFja2dyb3VuZDogcmdiYSgxNDAsMTA2LDIxNCwwLjA4KTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwYWRkaW5nOiAwLjM3NXJlbSAwLjVyZW07IGJvcmRlci1yYWRpdXM6IDAuNXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgbWFyZ2luLWJvdHRvbTogMC4zNzVyZW07IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLWhlYWRlciAucXVlc3Rpb24tdmFsdWUgeyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogcmdiYSgwLDAsMCwwLjg1KTsgfVxuLnEtZGVzY3JpcHRpdmUgLmRlc2MtaGVhZGVyIC5kZXNjLXNjb3JlIHsgd2lkdGg6IDguNzVyZW07IGZsZXg6IDAgMCA4Ljc1cmVtOyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4ucS1kZXNjcmlwdGl2ZSAuZGVzYy1oZWFkZXIgLnNjb3JlLWxhYmVsIHsgZm9udC1zaXplOiAwLjgxMjVyZW07IGNvbG9yOiByZ2JhKDAsMCwwLDAuNTUpOyB9XG4ucS1kZXNjcmlwdGl2ZSAuZGVzYy1oZWFkZXIgLnNjb3JlLXZhbHVlIHsgZm9udC1zaXplOiAxLjEyNXJlbTsgZm9udC13ZWlnaHQ6IDgwMDsgY29sb3I6ICNmMzljMTI7IGJhY2tncm91bmQ6ICNmZmY7IHBhZGRpbmc6IDAuNzVyZW0gMC41cmVtOyBib3JkZXItcmFkaXVzOiAwLjYyNXJlbTsgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgcmdiYSgwLDAsMCwwLjA0KTsgbWFyZ2luLXRvcDogMC4zNzVyZW07IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLW1vZGVsIHsgcGFkZGluZzogMC43NXJlbTsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtMik7IGJvcmRlci1yYWRpdXM6IDAuNjI1cmVtOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS1iYmx1ZS1ib3JkZXIpOyBib3JkZXItbGVmdDogMC4xODc1cmVtIHNvbGlkIHZhcigtLWJibHVlLWJvcmRlcik7IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLXN0dWRlbnQgeyBwYWRkaW5nOiAwLjc1cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmVlbi1iZyk7IGJvcmRlci1yYWRpdXM6IDAuNjI1cmVtOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS1iZ3JlZW4tYm9yZGVyKTsgYm9yZGVyLWxlZnQ6IDAuMTg3NXJlbSBzb2xpZCB2YXIoLS1iZ3JlZW4tYm9yZGVyKTsgfVxuLnEtZGVzY3JpcHRpdmUgLmRlc2MtbW9kZWwgLm1vZGVsLWxhYmVsLFxuLnEtZGVzY3JpcHRpdmUgLmRlc2Mtc3R1ZGVudCAuc3R1ZGVudC1sYWJlbCB7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiByZ2JhKDAsMCwwLDAuNyk7IG1hcmdpbi1ib3R0b206IDAuMzc1cmVtOyBmb250LXNpemU6IDAuNzVyZW07IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjA0ZW07IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLW1vZGVsIC5tb2RlbC10ZXh0LFxuLnEtZGVzY3JpcHRpdmUgLmRlc2Mtc3R1ZGVudCAuYW5zd2VyLXRleHQgeyBjb2xvcjogcmdiYSgwLDAsMCwwLjg1KTsgbGluZS1oZWlnaHQ6IDEuNTU7IH1cbi5xLWRlc2NyaXB0aXZlIC5kZXNjLXNjb3JlIHsgd2lkdGg6IDguNzVyZW07IGJhY2tncm91bmQ6ICNmZmY7IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHJnYmEoMCwwLDAsMC4wNCk7IHBhZGRpbmc6IDAuNjI1cmVtOyBib3JkZXItcmFkaXVzOiAwLjVyZW07IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XG4ucS1kZXNjcmlwdGl2ZSAuc2NvcmUtbGFiZWwgeyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogcmdiYSgwLDAsMCwwLjYpOyBtYXJnaW4tYm90dG9tOiAwLjM3NXJlbTsgfVxuLnEtZGVzY3JpcHRpdmUgLnNjb3JlLXZhbHVlIHsgZm9udC1zaXplOiAxcmVtOyBmb250LXdlaWdodDogODAwOyBjb2xvcjogIzBiNjZkMDsgfVxuLnEtZGVzY3JpcHRpdmUgLnEtZmVlZGJhY2sgeyBwYWRkaW5nOiAwLjc1cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibHVlLWJnKTsgYm9yZGVyLXJhZGl1czogMC42MjVyZW07IGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLWJibHVlLWJvcmRlcik7IGJvcmRlci1sZWZ0OiAwLjE4NzVyZW0gc29saWQgdmFyKC0tYmJsdWUtYm9yZGVyKTsgbGluZS1oZWlnaHQ6IDEuNTsgfVxuXG4vLyDDosKUwoDDosKUwoAgUmV2aWV3IGNvbW1lbnQgY29sdW1ucyDDosKUwoDDosKUwoBcbi5xLXJldmlldy1jb21tZW50cyB7IG1hcmdpbi10b3A6IDFyZW07IHBhZGRpbmctdG9wOiAxcmVtOyBib3JkZXItdG9wOiAwLjA2MjVyZW0gZGFzaGVkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgfVxuLnJldmlldy1jb2x1bW5zIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjsgZ2FwOiAwLjg3NXJlbTsgfVxuLnJldmlldy1jb2x1bW5zIC5jb2wgeyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCByZ2JhKDAsMCwwLDAuMDYpOyBwYWRkaW5nOiAwLjg3NXJlbTsgYm9yZGVyLXJhZGl1czogMC43NXJlbTsgbWluLWhlaWdodDogNHJlbTsgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjI1cyAkZWFzZSwgdHJhbnNmb3JtIDAuMjVzICRlYXNlLWJvdW5jZTsgfVxuLnJldmlldy1jb2x1bW5zIC5jb2w6aG92ZXIgeyBib3gtc2hhZG93OiAwIDAuNXJlbSAxLjI1cmVtIHJnYmEoMTUsMjMsNDIsMC4wNik7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4xMjVyZW0pOyB9XG4ucmV2aWV3LWNvbHVtbnMgLmNvbCBoNCB7IG1hcmdpbjogMCAwIDAuNXJlbTsgZm9udC1zaXplOiAwLjg3NXJlbTsgfVxuLnJldmlldy1jb2x1bW5zIC5jb2wubWlzc2VkIHsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tcmVkLWJnKSAwJSwgI2ZmZiA5MCUpOyBib3JkZXItY29sb3I6IHZhcigtLWJyZWQtYm9yZGVyKTsgYm9yZGVyLXRvcDogMC4xODc1cmVtIHNvbGlkIHZhcigtLXJlZC10ZXh0KTsgfVxuLnJldmlldy1jb2x1bW5zIC5jb2wuaW5jb3JyZWN0IHsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tb3JhbmdlLWJnKSAwJSwgI2ZmZiA5MCUpOyBib3JkZXItY29sb3I6IHZhcigtLWJvcmFuZ2UtYm9yZGVyKTsgYm9yZGVyLXRvcDogMC4xODc1cmVtIHNvbGlkIHZhcigtLW9yYW5nZS10ZXh0KTsgfVxuLnJldmlldy1jb2x1bW5zIC5jb2wuaW5jb21wbGV0ZSB7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLXllbGxvdy1iZykgMCUsICNmZmYgOTAlKTsgYm9yZGVyLWNvbG9yOiB2YXIoLS1ieWVsbG93LWJvcmRlcik7IGJvcmRlci10b3A6IDAuMTg3NXJlbSBzb2xpZCB2YXIoLS15ZWxsb3ctdGV4dCk7IH1cblxuLmNvbC1oZWFkZXIgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDAuNXJlbTsgbWFyZ2luLWJvdHRvbTogMC43NXJlbTsgcGFkZGluZy1ib3R0b206IDAuNXJlbTsgYm9yZGVyLWJvdHRvbTogMC4wNjI1cmVtIHNvbGlkIHJnYmEoMCwwLDAsMC4wNik7IH1cbi5jb2wtaGVhZGVyIGg0IHsgbWFyZ2luOiAwOyBmb250LXNpemU6IDAuODEyNXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgY29sb3I6IHZhcigtLXRoZW1lLTMtdGV4dC0yKTsgfVxuLmRvdCB7IHdpZHRoOiAwLjVyZW07IGhlaWdodDogMC41cmVtOyBib3JkZXItcmFkaXVzOiA1MCU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgZmxleC1zaHJpbms6IDA7IGJveC1zaGFkb3c6IDAgMCAwIDAuMTg3NXJlbSByZ2JhKDAsMCwwLDAuMDQpOyB9XG4uZG90LnJlZCB7IGJhY2tncm91bmQ6IHZhcigtLXJlZC10ZXh0KTsgfVxuLmRvdC5vcmFuZ2UgeyBiYWNrZ3JvdW5kOiB2YXIoLS1vcmFuZ2UtdGV4dCk7IH1cbi5kb3QueWVsbG93IHsgYmFja2dyb3VuZDogdmFyKC0teWVsbG93LXRleHQpOyB9XG5cbi5yZXZpZXctaXRlbSB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMC42MjVyZW07IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4ucmktbGVmdCB7IHdpZHRoOiAycmVtOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1zdGFydDsganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyBmbGV4LXNocmluazogMDsgfVxuLnJpLWljb24geyB3aWR0aDogMS42MjVyZW07IGhlaWdodDogMS42MjVyZW07IGRpc3BsYXk6IGlubGluZS1mbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07IGZvbnQtc2l6ZTogMC43NXJlbTsgZm9udC13ZWlnaHQ6IDcwMDsgfVxuLnJpLWljb24ubWlzc2VkIHsgY29sb3I6IHZhcigtLXJlZC10ZXh0KTsgYmFja2dyb3VuZDogcmdiYSgxODUsMjgsMjgsMC4wOCk7IH1cbi5yaS1pY29uLmluY29ycmVjdCB7IGNvbG9yOiB2YXIoLS1vcmFuZ2UtdGV4dCk7IGJhY2tncm91bmQ6IHJnYmEoMTk0LDY1LDEyLDAuMDgpOyB9XG4ucmktaWNvbi5pbmNvbXBsZXRlIHsgY29sb3I6IHZhcigtLXllbGxvdy10ZXh0KTsgYmFja2dyb3VuZDogcmdiYSgxODAsODMsOSwwLjA4KTsgfVxuLnJpLWJvZHkgeyBmbGV4OiAxOyBtaW4td2lkdGg6IDA7IH1cblxuLnJldmlldy10ZXh0LmRlbGV0ZWQgeyBjb2xvcjogZ3JheTsgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7IH1cbi5kZWxldGVkLWJ5IHsgY29sb3I6ICNjMDM5MmI7IGZvbnQtc3R5bGU6IGl0YWxpYzsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi10b3A6IDAuMzc1cmVtOyBmb250LXNpemU6IDAuNzVyZW07IH1cbi5yZXZpZXctdGV4dC1taXNzZWQgeyBkaXNwbGF5OiBmbGV4OyBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS0zKTsgZm9udC13ZWlnaHQ6IDQwMDsgcGFkZGluZzogMC42MjVyZW0gMC43NXJlbTsgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgdmFyKC0tYnJlZC1ib3JkZXIpOyBib3JkZXItcmFkaXVzOiAwLjVyZW07IGxpbmUtaGVpZ2h0OiAxLjQ1OyB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMTVzICRlYXNlOyB9XG4ucmV2aWV3LXRleHQtbWlzc2VkOmhvdmVyIHsgYm94LXNoYWRvdzogJHNoYWRvdy1zbTsgfVxuLnJldmlldy10ZXh0LWluY29ycmVjdCB7IGRpc3BsYXk6IGZsZXg7IGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLTMpOyBmb250LXdlaWdodDogNDAwOyBwYWRkaW5nOiAwLjYyNXJlbSAwLjc1cmVtOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS1ib3JhbmdlLWJvcmRlcik7IGJvcmRlci1yYWRpdXM6IDAuNXJlbTsgbGluZS1oZWlnaHQ6IDEuNDU7IHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXMgJGVhc2U7IH1cbi5yZXZpZXctdGV4dC1pbmNvcnJlY3Q6aG92ZXIgeyBib3gtc2hhZG93OiAkc2hhZG93LXNtOyB9XG4ucmV2aWV3LXRleHQtaW5jb21wbGV0ZSB7IGRpc3BsYXk6IGZsZXg7IGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLTMpOyBmb250LXdlaWdodDogNDAwOyBwYWRkaW5nOiAwLjYyNXJlbSAwLjc1cmVtOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS1ieWVsbG93LWJvcmRlcik7IGJvcmRlci1yYWRpdXM6IDAuNXJlbTsgbGluZS1oZWlnaHQ6IDEuNDU7IHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXMgJGVhc2U7IH1cbi5yZXZpZXctdGV4dC1pbmNvbXBsZXRlOmhvdmVyIHsgYm94LXNoYWRvdzogJHNoYWRvdy1zbTsgfVxuLnJldmlldy1tZXRhIHsgZm9udC1zaXplOiAwLjY4NzVyZW07IGNvbG9yOiByZ2JhKDAsMCwwLDAuNSk7IG1hcmdpbi10b3A6IDAuMzc1cmVtOyBsZXR0ZXItc3BhY2luZzogMC4wMWVtOyB9XG5cbi5yZXZpZXctYWN0aW9ucyB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMC4xMjVyZW07IH1cbi5yZXZpZXctYWN0aW9ucyBtYXQtaWNvbiB7IGZvbnQtc2l6ZTogaW5pdGlhbCAhaW1wb3J0YW50OyB9XG4ucmV2aWV3LWFjdGlvbnMgLmVkaXQtbGluayxcbi5yZXZpZXctYWN0aW9ucyAuZGVsZXRlLWxpbmssXG4uc2F2ZS1saW5rLFxuLmNhbmNlbC1saW5rIHsgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07IGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IG1hcmdpbi1yaWdodDogMC4zNzVyZW07IGN1cnNvcjogcG9pbnRlcjsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAwLjE4NzVyZW07IGZvbnQtc2l6ZTogMC44MTI1cmVtOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzICRlYXNlLCBvcGFjaXR5IDAuMTVzICRlYXNlOyB9XG4ucmV2aWV3LWFjdGlvbnMgLmVkaXQtbGluazpob3Zlcixcbi5zYXZlLWxpbms6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDk5LDEwMiwyNDEsMC4wNik7IH1cbi5yZXZpZXctYWN0aW9ucyAuZGVsZXRlLWxpbmsgeyBjb2xvcjogI2QzMzsgfVxuLnJldmlldy1hY3Rpb25zIC5kZWxldGUtbGluazpob3ZlciB7IGJhY2tncm91bmQ6IHJnYmEoMjIxLDUxLDUxLDAuMDYpOyB9XG4uY2FuY2VsLWxpbms6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMDQpOyB9XG4uZWRpdC1jb21tZW50LXRleHQgeyB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTsgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgdmFyKC0tYm9yZGVyLTEpOyBib3JkZXItcmFkaXVzOiAwLjM3NXJlbTsgcGFkZGluZzogMC4zNzVyZW0gMC41cmVtOyBmb250LXNpemU6IDAuODEyNXJlbTsgbGluZS1oZWlnaHQ6IDEuNDU7IHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzICRlYXNlOyByZXNpemU6IHZlcnRpY2FsOyB9XG4uZWRpdC1jb21tZW50LXRleHQ6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyBib3JkZXItY29sb3I6IHZhcigtLWJ1dHRvbi0xKTsgYm94LXNoYWRvdzogMCAwIDAgMC4xMjVyZW0gcmdiYSg5OSwxMDIsMjQxLDAuMSk7IH1cblxuLy8gw6LClMKAw6LClMKAIE1hcmtzIGVkaXRpbmcgZm9yIGRlc2NyaXB0aXZlIHF1ZXN0aW9ucyDDosKUwoDDosKUwoBcbi5tYXJrcy1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuMzc1cmVtO1xufVxuXG4ubWFya3MtZGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC4zNzVyZW07XG59XG5cbi5lZGl0LW1hcmtzLWJ0biB7XG4gIHdpZHRoOiAxLjc1cmVtICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMS43NXJlbSAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMS43NXJlbSAhaW1wb3J0YW50O1xuICBvcGFjaXR5OiAwLjY7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAkZWFzZSwgYmFja2dyb3VuZCAwLjJzICRlYXNlO1xuICBcbiAgbWF0LWljb24ge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICB3aWR0aDogMXJlbTtcbiAgICBoZWlnaHQ6IDFyZW07XG4gIH1cbiAgXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYmFja2dyb3VuZDogcmdiYSg5OSwxMDIsMjQxLDAuMDgpO1xuICB9XG59XG5cbi5tYXJrcy1lZGl0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjM3NXJlbTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgdmFyKC0tYnV0dG9uLTEpO1xuICBib3gtc2hhZG93OiAwIDAuMTI1cmVtIDAuNXJlbSByZ2JhKDk5LDEwMiwyNDEsMC4xNSk7XG59XG5cbi5tYXJrcy1pbnB1dCB7XG4gIHdpZHRoOiAzLjVyZW07XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC4zNzVyZW07XG4gIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHZhcigtLWJvcmRlci0xKTtcbiAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgJGVhc2UsIGJveC1zaGFkb3cgMC4ycyAkZWFzZTtcbiAgXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1idXR0b24tMSk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMC4xMjVyZW0gcmdiYSg5OSwxMDIsMjQxLDAuMSk7XG4gIH1cbiAgXG4gICY6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG4gICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLm1hcmtzLW1heCB7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBjb2xvcjogcmdiYSgwLDAsMCwwLjU1KTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnNhdmUtbWFya3MtYnRuIHtcbiAgd2lkdGg6IDEuNzVyZW0gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxLjc1cmVtICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjc1cmVtICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB2YXIoLS1ncmVlbi10ZXh0KSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi1iZykgIWltcG9ydGFudDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzICRlYXNlO1xuICBcbiAgbWF0LWljb24ge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICB3aWR0aDogMXJlbTtcbiAgICBoZWlnaHQ6IDFyZW07XG4gIH1cbiAgXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDAuODU7XG4gIH1cbn1cblxuLmNhbmNlbC1tYXJrcy1idG4ge1xuICB3aWR0aDogMS43NXJlbSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEuNzVyZW0gIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDEuNzVyZW0gIWltcG9ydGFudDtcbiAgY29sb3I6IHZhcigtLXJlZC10ZXh0KSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1yZWQtYmcpICFpbXBvcnRhbnQ7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAkZWFzZTtcbiAgXG4gIG1hdC1pY29uIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgd2lkdGg6IDFyZW07XG4gICAgaGVpZ2h0OiAxcmVtO1xuICB9XG4gIFxuICAmOmhvdmVyIHtcbiAgICBvcGFjaXR5OiAwLjg1O1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBNYXJrcyBIaXN0b3J5IFNlY3Rpb24gw6LClMKAw6LClMKAXG4ubWFya3MtaGlzdG9yeS1zZWN0aW9uIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSg5OSwxMDIsMjQxLDAuMDMpIDAlLCByZ2JhKDU5LDEzMCwyNDYsMC4wMikgMTAwJSk7XG4gIGJvcmRlci1yYWRpdXM6IDAuNzVyZW07XG4gIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHJnYmEoOTksMTAyLDI0MSwwLjEpO1xufVxuXG4ubWFya3MtaGlzdG9yeS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC44NzVyZW07XG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XG4gIGJvcmRlci1ib3R0b206IDAuMDYyNXJlbSBzb2xpZCByZ2JhKDk5LDEwMiwyNDEsMC4xKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgY29sb3I6IHZhcigtLWJ1dHRvbi0xKTtcbiAgXG4gIG1hdC1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgIHdpZHRoOiAxLjEyNXJlbTtcbiAgICBoZWlnaHQ6IDEuMTI1cmVtO1xuICB9XG59XG5cbi5tYXJrcy1oaXN0b3J5LXRpbWVsaW5lIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAwO1xufVxuXG4uaGlzdG9yeS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjg3NXJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGlzdG9yeS1pbmRpY2F0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMS41cmVtO1xuICBmbGV4LXNocmluazogMDtcbiAgXG4gIC5kb3Qge1xuICAgIHdpZHRoOiAwLjc1cmVtO1xuICAgIGhlaWdodDogMC43NXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgei1pbmRleDogMTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAwLjE4NzVyZW0gcmdiYSgyNTUsMjU1LDI1NSwxKTtcbiAgICBcbiAgICAmLmN1cnJlbnQge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzEwYjk4MSwgIzA1OTY2OSk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAwLjE4NzVyZW0gcmdiYSgxNiwxODUsMTI5LDAuMTUpLCAwIDAuMTI1cmVtIDAuMzc1cmVtIHJnYmEoMTYsMTg1LDEyOSwwLjI1KTtcbiAgICB9XG4gICAgXG4gICAgJi5wYXN0IHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM5NGEzYjgsICM2NDc0OGIpO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDAgMC4xODc1cmVtIHJnYmEoMTQ4LDE2MywxODQsMC4xNSk7XG4gICAgfVxuICB9XG4gIFxuICAubGluZSB7XG4gICAgd2lkdGg6IDAuMTI1cmVtO1xuICAgIGZsZXg6IDE7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgxNDgsMTYzLDE4NCwwLjQpIDAlLCByZ2JhKDE0OCwxNjMsMTg0LDAuMSkgMTAwJSk7XG4gICAgbWFyZ2luOiAwLjI1cmVtIDA7XG4gICAgbWluLWhlaWdodDogMXJlbTtcbiAgfVxufVxuXG4uaGlzdG9yeS1jb250ZW50IHtcbiAgZmxleDogMTtcbiAgcGFkZGluZy1ib3R0b206IDAuODc1cmVtO1xufVxuXG4uaGlzdG9yeS1jYXJkIHtcbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjYyNXJlbTtcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjI1cyAkZWFzZSwgdHJhbnNmb3JtIDAuMjVzICRlYXNlLWJvdW5jZSwgYm9yZGVyLWNvbG9yIDAuMjVzICRlYXNlO1xuICBcbiAgJi5jdXJyZW50IHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDE2LDE4NSwxMjksMC4wOCkgMCUsIHJnYmEoNSwxNTAsMTA1LDAuMDQpIDEwMCUpO1xuICAgIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHJnYmEoMTYsMTg1LDEyOSwwLjIpO1xuICAgIGJveC1zaGFkb3c6IDAgMC4xMjVyZW0gMC41cmVtIHJnYmEoMTYsMTg1LDEyOSwwLjEpO1xuICAgIFxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCAwLjM3NXJlbSAxcmVtIHJnYmEoMTYsMTg1LDEyOSwwLjE4KTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4xODc1cmVtKTtcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgxNiwxODUsMTI5LDAuMyk7XG4gICAgfVxuICB9XG4gIFxuICAmLnBhc3Qge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ4LDI1MCwyNTIsMC44KTtcbiAgICBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCByZ2JhKDAsMCwwLDAuMDYpO1xuICAgIFxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogJHNoYWRvdy1tZDtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4xMjVyZW0pO1xuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuICB9XG59XG5cbi5oaXN0b3J5LWJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHBhZGRpbmc6IDAuMTg3NXJlbSAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMTBiOTgxLCAjMDU5NjY5KTtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbi1ib3R0b206IDAuMzc1cmVtO1xuICBib3gtc2hhZG93OiAwIDAuMDYyNXJlbSAwLjI1cmVtIHJnYmEoMTYsMTg1LDEyOSwwLjMpO1xufVxuXG4uaGlzdG9yeS1tYXJrcyB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogcmdiYSgwLDAsMCwwLjg1KTtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBcbiAgLm1hcmtzLXRvdGFsIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogcmdiYSgwLDAsMCwwLjQ1KTtcbiAgfVxufVxuXG4uaGlzdG9yeS1jYXJkLnBhc3QgLmhpc3RvcnktbWFya3Mge1xuICBmb250LXNpemU6IDEuMTI1cmVtO1xuICBjb2xvcjogcmdiYSgwLDAsMCwwLjYpO1xuICBcbiAgLm1hcmtzLXRvdGFsIHtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICB9XG59XG5cbi5oaXN0b3J5LW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMC43NXJlbTtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGNvbG9yOiByZ2JhKDAsMCwwLDAuNTUpO1xuICBcbiAgLnVwZGF0ZWQtYnksXG4gIC51cGRhdGVkLWRhdGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDAuMjVyZW07XG4gICAgXG4gICAgbWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICAgIHdpZHRoOiAwLjg3NXJlbTtcbiAgICAgIGhlaWdodDogMC44NzVyZW07XG4gICAgICBvcGFjaXR5OiAwLjY7XG4gICAgfVxuICB9XG4gIFxuICAudXBkYXRlZC1ieSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogcmdiYSgwLDAsMCwwLjcpO1xuICB9XG59XG5cbi5oaXN0b3J5LWNhcmQuY3VycmVudCAuaGlzdG9yeS1tZXRhIHtcbiAgLnVwZGF0ZWQtYnkge1xuICAgIGNvbG9yOiB2YXIoLS1ncmVlbi10ZXh0KTtcbiAgfVxufVxuLy8gw6LClMKAw6LClMKAIFJlc3BvbnNpdmUgw6LClMKAw6LClMKAXG5AbWVkaWEgKG1heC13aWR0aDogNTVyZW0pIHtcbiAgLnBhZ2UgeyBwYWRkaW5nOiAwLjc1cmVtIDAuNzVyZW0gMnJlbTsgfVxuICAudG9vbGJhciB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBzdHJldGNoOyBwYWRkaW5nLWJvdHRvbTogMC42MjVyZW07IH1cbiAgLnNlbGVjdGlvbnMgeyBtYXgtd2lkdGg6IDEwMCU7IGZsZXg6IDEgMSAxMDAlOyB9XG4gIC5yZXBvcnQtc3VtbWFyeS1ncmlkIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpOyB9XG4gIC50YWItYWN0aW9ucyB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBzdHJldGNoOyB9XG4gIC50YWItYWN0aW9ucyAuc2VhcmNoIHsgbWF4LXdpZHRoOiAxMDAlOyB9XG4gIC50YWItYWN0aW9ucyAuYWN0aW9uLXJvdyB7IGZsZXgtd3JhcDogd3JhcDsgfVxuICAucmV2aWV3LWNvbHVtbnMgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxuICAucS1vcHRpb25zLnR3by1jb2wgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxuICAudXNlci1yZXZpZXctcGFuZWwgeyB3aWR0aDogOTYlOyB9XG4gIC53cm9uZy1zdW1tYXJ5LXBhbmVsLCAucmVzb3VyY2UtcGFuZWwgeyB3aWR0aDogMTAwJTsgbWF4LXdpZHRoOiAxMDAlOyB9XG4gIC53cm9uZy1zdW1tYXJ5LXBhbmVsIC5jYXJkLCAucmVzb3VyY2UtcGFuZWwgLmNhcmQgeyBib3JkZXItcmFkaXVzOiAwLjYyNXJlbTsgfVxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAucGFuZWwtYm9keSB7IHBhZGRpbmc6IDAuNzVyZW07IH1cbiAgLnEtZGVzY3JpcHRpdmUgLmRlc2Mtcm93IHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAucS1kZXNjcmlwdGl2ZSAuZGVzYy1zY29yZSB7IHdpZHRoOiAxMDAlOyB9XG4gIC5xLWRlc2NyaXB0aXZlIC5kZXNjLWhlYWRlciB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4gIC5xLWRlc2NyaXB0aXZlIC5kZXNjLWhlYWRlciAuZGVzYy1zY29yZSB7IHdpZHRoOiAxMDAlOyBmbGV4OiBub25lOyBtYXJnaW4tdG9wOiAwLjVyZW07IH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ1cmVtKSB7XG4gIC5yZXBvcnQtc3VtbWFyeS1ncmlkIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IHBhZGRpbmc6IDAuODc1cmVtOyB9XG4gIC5zdW1tYXJ5LWNhcmQgeyBwYWRkaW5nOiAwLjg3NXJlbTsgfVxuICAuc3VtbWFyeS1tZXRhIHsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgfVxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSxcbiAgLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGhlYWQsXG4gIC53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRib2R5LFxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0cixcbiAgLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGgsXG4gIC53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRkIHsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyB9XG4gIC53cm9uZy1zdW1tYXJ5LXBhbmVsIC5zdW1tYXJ5LXRhYmxlIHRoZWFkIHsgZGlzcGxheTogbm9uZTsgfVxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0Ym9keSB0ciB7IG1hcmdpbi1ib3R0b206IDAuNzVyZW07IGJvcmRlci1yYWRpdXM6IDAuNjI1cmVtOyBvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCB2YXIoLS10aGVtZS0zLWJvcmRlcik7IH1cbiAgLndyb25nLXN1bW1hcnktcGFuZWwgLnN1bW1hcnktdGFibGUgdGJvZHkgdGQgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHRleHQtYWxpZ246IGxlZnQ7IGJvcmRlci1yYWRpdXM6IDA7IGJvcmRlcjogbm9uZTsgYm9yZGVyLWJvdHRvbTogMC4wNjI1cmVtIHNvbGlkIHZhcigtLXRoZW1lLTMtYm9yZGVyKTsgfVxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0Ym9keSB0ZDpsYXN0LWNoaWxkIHsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxuICAud3Jvbmctc3VtbWFyeS1wYW5lbCAuc3VtbWFyeS10YWJsZSB0Ym9keSB0ZDo6YmVmb3JlIHsgY29udGVudDogYXR0cihkYXRhLWxhYmVsKTsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6IHZhcigtLXRoZW1lLTMtdGV4dC0yKTsgbWFyZ2luLXJpZ2h0OiAwLjVyZW07IH1cbiAgLnNlbGVjdGlvbnMgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 5441:
/*!********************************************************************!*\
  !*** ./src/app/userrole/admin/exam-reports/exam-reports.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExamReportsModule: () => (/* binding */ ExamReportsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tabs */ 8223);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/autocomplete */ 9771);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/datepicker */ 1977);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/cdk/overlay */ 1570);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/portal */ 9168);
/* harmony import */ var _exam_reports_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exam-reports.component */ 6654);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);






















class ExamReportsModule {
  static {
    this.ɵfac = function ExamReportsModule_Factory(t) {
      return new (t || ExamReportsModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: ExamReportsModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__.MatSortModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__.MatTabsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__.MatAutocompleteModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__.MatDatepickerModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_17__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_18__.PortalModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
        path: '',
        component: _exam_reports_component__WEBPACK_IMPORTED_MODULE_0__.ExamReportsComponent
      }])]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ExamReportsModule, {
    declarations: [_exam_reports_component__WEBPACK_IMPORTED_MODULE_0__.ExamReportsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__.MatSortModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__.MatTabsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__.MatAutocompleteModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__.MatDatepickerModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_17__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_18__.PortalModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_userrole_admin_exam-reports_exam-reports_module_ts.js.map