import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { LocationService, Country, State, City } from '../../../../services/location.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_BASE } from 'src/app/shared/api.config';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';

@Component({
  selector: 'app-institute-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule, MatSlideToggleModule, MatIconModule, MatChipsModule, MatExpansionModule, MatCheckboxModule, MatStepperModule, MatDatepickerModule, RouterModule],
  templateUrl: './institute-register.component.html',
  styleUrls: ['./institute-register.component.scss']
})
export class InstituteRegisterComponent {
  // keep the original institute id when editing so we can send it in update payload
  editingInstituteId: string | null = null;
  headOfficeCampusId: string | null = null;
  // index of the expansion panel that should be expanded (helps open newly added campus)
  expandedIndex: number | null = null;
  form = this.fb.group({
    name: ['', Validators.required],
    short_name: ['', Validators.required],
    // Head office block
    headOffice: this.fb.group({
      address: [''],
      pincode: [''],
      city: [''],
      state: [''],
      country: [''],
      email: [''],
      phone: [''],
      website: ['']
    }),
    // pincode: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z -]{3,10}$')]],
    // kept for backwards compatibility but not required (headOffice.country is used in the form)
    country: [''],
    contact_email: ['', [Validators.email]],
    contact_phone: ['', [Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]],
    primary_contact_phone: ['', [Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]],
    website: ['', [Validators.pattern('.+')]], //['', [Validators.pattern('https?://.+')]],
    primary_contact_person: ['', Validators.required],
    primary_contact_email: ['', [Validators.required, Validators.email]],
    // Use null for empty select values so Material does not treat a blank option as selected.
    industry_type: [null as string | null, Validators.required],
    industry_sector: [null as string | null, Validators.required],
    department: [''],
    branch: [''],
    team: [''],
    max_users: [null, [Validators.min(1)]],
    subscription_start: [null],
    subscription_end: [null],
    active: [true],
    campuses: this.fb.array([])
  });

  // static fallback list is removed; we'll use the location service
  countries: Country[] = [];
  headOfficeCountrySearch = '';
  headOfficeStateSearch = '';
  campusCountrySearch: Record<string, string> = {};
  campusStateSearch: Record<string, string> = {};
  stateOptions: State[] = [];
  cityOptions: City[] = [];
  loadingStates = false;
  loadingCities = false;

  // Per-campus option maps keyed by a unique campus id (_cid)
  campusStateOptions: Record<string, State[]> = {};
  campusCityOptions: Record<string, City[]> = {};
  campusLoadingStates: Record<string, boolean> = {};
  campusLoadingCities: Record<string, boolean> = {};
  campusSubs: Record<string, Subscription> = {};

  industryTypes = ['School', 'College', 'BPO', 'Bank', 'IT'];
  // static master list (kept for reference)
  industrySectors = ['School', 'Engineering', 'Arts', 'Healthcare', 'Finance', 'Banking', 'IT'];

  // dynamic options shown in the Sector dropdown based on selected Industry
  sectorOptions: string[] = [];

  // department and team lists (chips)
  departmentList: string[] = [];
  teamList: string[] = [];
  branchList: string[] = [];

  // optional selected department when adding a branch
  selectedBranchDepartment: string | null = '';

  // separators for chip input (Enter and comma)
  readonly separatorKeysCodes: number[] = [13, 188]; // Enter, Comma

  private sectorMap: Record<string, string[]> = {
    'School': ['School'],
    'College': ['Engineering', 'Arts'],
    'BPO': ['Healthcare', 'Finance'],
    'Bank': ['Bank'],
    'IT': ['IT']
  };

  constructor(private fb: FormBuilder, private _snack: MatSnackBar, private http: HttpClient, private cd: ChangeDetectorRef, private locationService: LocationService, private pageMetaService: PageMetaService, private router: Router) { }

  isEditing = false;
  isSubmitting = false;

  get filteredHeadOfficeCountries(): Country[] {
    return this.filterCountries(this.headOfficeCountrySearch);
  }

  get filteredHeadOfficeStates(): State[] {
    return this.filterStates(this.stateOptions, this.headOfficeStateSearch);
  }

  private filterCountries(searchText: string | null | undefined): Country[] {
    const term = (searchText || '').trim().toLowerCase();
    if (!term) return this.countries;
    return this.countries.filter(country => (country.name || '').toLowerCase().includes(term));
  }

  private filterStates(states: State[], searchText: string | null | undefined): State[] {
    const term = (searchText || '').trim().toLowerCase();
    if (!term) return states;
    return states.filter(state => (state.name || '').toLowerCase().includes(term));
  }

  private isPrimaryCampus(campus: any): boolean {
    const value = campus?.is_primary ?? campus?.isPrimary;
    if (typeof value === 'string') {
      return ['true', '1', 'yes', 'primary'].includes(value.trim().toLowerCase());
    }
    return value === true || value === 1;
  }

  private isHeadOfficeCampus(campus: any, institute: any): boolean {
    const campusName = (campus?.name || '').toString().trim().toLowerCase();
    const shortName = (institute?.short_name || institute?.short || '').toString().trim().toLowerCase();
    // Backend-created Head Office rows are stored as primary campuses named with the institute short name.
    return this.isPrimaryCampus(campus) && !!shortName && campusName === shortName;
  }

  onHeadOfficeCountryOpened(opened: boolean) {
    if (opened) {
      this.focusLocationSearchInput();
      return;
    }
    this.headOfficeCountrySearch = '';
  }

  onHeadOfficeStateOpened(opened: boolean) {
    if (opened) {
      this.focusLocationSearchInput();
      return;
    }
    this.headOfficeStateSearch = '';
  }

  stopLocationSearchEvent(event: Event) {
    event.stopPropagation();
  }

  private focusLocationSearchInput() {
    setTimeout(() => {
      try {
        const input = document.querySelector('.cdk-overlay-pane .select-search-input') as HTMLInputElement | null;
        input?.focus();
      } catch (e) { /* ignore non-browser environments */ }
    });
  }

  private campusControlId(control: AbstractControl | any): string {
    try { return control?.get('_cid')?.value || ''; } catch (e) { return ''; }
  }

  getCampusCountrySearch(control: AbstractControl | any): string {
    const cid = this.campusControlId(control);
    return cid ? (this.campusCountrySearch[cid] || '') : '';
  }

  setCampusCountrySearch(control: AbstractControl | any, value: string) {
    const cid = this.campusControlId(control);
    if (!cid) return;
    this.campusCountrySearch[cid] = value || '';
  }

  getFilteredCampusCountries(control: AbstractControl | any): Country[] {
    return this.filterCountries(this.getCampusCountrySearch(control));
  }

  onCampusCountryOpened(control: AbstractControl | any, opened: boolean) {
    if (opened) {
      this.focusLocationSearchInput();
      return;
    }
    const cid = this.campusControlId(control);
    if (cid) this.campusCountrySearch[cid] = '';
  }

  getCampusStateSearch(control: AbstractControl | any): string {
    const cid = this.campusControlId(control);
    return cid ? (this.campusStateSearch[cid] || '') : '';
  }

  setCampusStateSearch(control: AbstractControl | any, value: string) {
    const cid = this.campusControlId(control);
    if (!cid) return;
    this.campusStateSearch[cid] = value || '';
  }

  getFilteredCampusStates(control: AbstractControl | any): State[] {
    const cid = this.campusControlId(control);
    const states = cid ? (this.campusStateOptions[cid] || []) : [];
    return this.filterStates(states, this.getCampusStateSearch(control));
  }

  onCampusStateOpened(control: AbstractControl | any, opened: boolean) {
    if (opened) {
      this.focusLocationSearchInput();
      return;
    }
    const cid = this.campusControlId(control);
    if (cid) this.campusStateSearch[cid] = '';
  }

  ngAfterViewInit(): void {
    // If we have an institute to edit in sessionStorage, prefill the form
    try {
      const raw = sessionStorage.getItem('edit_institute');
      if (raw) {
        const obj = JSON.parse(raw);
        this.isEditing = true;
        // capture the original institute id for update payloads
        this.editingInstituteId = obj.institute_id || obj.id || obj._id || null;
        // populate simple fields
        this.form.patchValue({
          // Keep missing industry values as null so required validation works consistently.
          name: obj.name || '', short_name: obj.short_name || obj.short || '', industry_type: obj.industry_type || null, industry_sector: obj.industry_sector || null,
          primary_contact_person: obj.primary_contact_person || '', primary_contact_email: obj.primary_contact_email || '', primary_contact_phone: obj.primary_contact_phone || '',
          website: obj.website || '', max_users: obj.max_users || null, active: !!obj.active_status
        });

        // If the stored institute has subscription dates, convert them to Date objects for the datepicker
        try {
          if (obj.subscription_start) {
            const s = new Date(obj.subscription_start);
            if (!isNaN(s.getTime())) this.form.get('subscription_start')?.setValue(s as any);
          }
          if (obj.subscription_end) {
            const e = new Date(obj.subscription_end);
            if (!isNaN(e.getTime())) this.form.get('subscription_end')?.setValue(e as any);
          }
        } catch (e) { /* ignore conversion errors */ }
        const campusesData = Array.isArray(obj.campuses) ? obj.campuses : [];
        // Backend stores Head Office as the primary campus, so split it out before filling the campus UI.
        const headOfficeCampus = campusesData.find((campus: any) => this.isHeadOfficeCampus(campus, obj));

        // headOffice prefill: try explicit head office fields first, then fallback to the primary campus.
        try {
          const ho = obj.headOffice || obj.head_office || obj.head || headOfficeCampus || {};
          if (ho && Object.keys(ho).length) {
            this.headOfficeCampusId = ho.campus_id || ho.id || ho._id || null;
            const countryId = ho.country?.country_id || ho.country?.countryId || ho.country || ho.country_id || ho.country_code || '';
            const stateId = ho.state?.state_id || ho.state?.stateId || ho.state || ho.state_id || '';
            const cityId = ho.city?.city_id || ho.city?.cityId || ho.city || ho.city_id || '';
            this.form.get('headOffice')?.patchValue({
              address: ho.address || ho.addr || '',
              pincode: ho.pin_code || ho.pincode || ho.postal_code || '',
              country: countryId || '',
              state: stateId || '',
              city: cityId || '',
              email: ho.email || '',
              phone: ho.phone || ho.contact_no || '',
              website: ho.website || ''
            });

            // load states/cities for headOffice if country/state provided
            if (countryId) {
              this.locationService.getStatesForCountry(countryId).subscribe(states => {
                this.stateOptions = states || [];
                // if stateId present, ensure it's selected (patchValue already set it)
                if (stateId) {
                  // load cities for that state
                  this.locationService.getCitiesForState(stateId).subscribe(cities => {
                    this.cityOptions = cities || [];
                  }, () => { this.cityOptions = []; });
                }
              }, () => { this.stateOptions = []; });
            }
          }
        } catch (e) { }
        // departments and teams to chips
        this.departmentList = (obj.departments || []).map((d: any) => d.name || '');
        this.teamList = (obj.teams || []).map((t: any) => t.name || '');
        this.form.get('department')?.setValue(this.departmentList.join(','));
        this.form.get('team')?.setValue(this.teamList.join(','));
        // campuses
        if (campusesData.length) {
          for (const cp of campusesData.filter((campus: any) => !this.isHeadOfficeCampus(campus, obj))) {
            this.addCampus({
              campus_id: cp.campus_id || cp.id || cp._id || null,
              name: cp.name,
              address: cp.address,
              pincode: cp.pin_code || cp.pincode,
              country: cp.country?.country_id || cp.country?.country_id || cp.country,
              state: cp.state?.state_id || cp.state?.state_id || cp.state,
              city: cp.city?.city_id || cp.city?.city_id || cp.city,
              email: cp.email,
              phone: cp.phone,
              isPrimary: !!cp.is_primary,
              isActive: !!cp.active_status
            });
          }
        }
        // remove stored edit marker
        sessionStorage.removeItem('edit_institute');
      }
    } catch (e) { }
  }

  // FormArray helpers for campuses
  get campuses() {
    return this.form.get('campuses') as import('@angular/forms').FormArray;
  }

  createCampus(data?: any) {
    // attach a stable unique id (_cid) to each campus form so we can key option maps and subscriptions
    const cid = (Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
    return this.fb.group({
      campus_id: [data?.campus_id || data?.id || data?._id || null],
      _cid: [cid],
      name: [data?.name || ''],
      address: [data?.address || ''],
      pincode: [data?.pincode || ''],
      country: [data?.country || ''],
      state: [data?.state || ''],
      city: [data?.city || ''],
      email: [data?.email || ''],
      phone: [data?.phone || ''],
      isPrimary: [!!data?.isPrimary],
      isActive: [data?.isActive ?? true]
    });
  }

  addCampus(initial?: any) {
    this.campuses.push(this.createCampus(initial));
    // expand the newly added campus so the user sees the inputs immediately
    const newIndex = this.campuses.length - 1;
    this.expandedIndex = newIndex;
    // wire cascading dropdowns for the newly added campus
    try {
      const group = this.campuses.at(newIndex) as FormGroup;
      const cid = group.get('_cid')?.value as string;
      if (cid) {
        this.wireCampusLocationControls(group, cid);
        // if initial data provided with country/state, pre-load options
        if (initial && (initial.country || (initial.country && initial.country.country_id))) {
          const countryId = initial.country?.country_id || initial.country || '';
          const stateId = initial.state?.state_id || initial.state || '';
          const cityId = initial.city?.city_id || initial.city || '';
          if (countryId) {
            this.locationService.getStatesForCountry(countryId).subscribe(states => {
              this.campusStateOptions[cid] = states || [];
              if (stateId) {
                this.locationService.getCitiesForState(stateId).subscribe(cities => {
                  this.campusCityOptions[cid] = cities || [];
                }, () => { this.campusCityOptions[cid] = []; });
              }
            }, () => { this.campusStateOptions[cid] = []; });
          }
        }
      }
    } catch (e) { /* ignore in non-browser env */ }
    // ensure Angular applies the new DOM nodes
    this.cd.detectChanges();
    // wait a bit for the expansion animation to finish, then force a reflow and focus the first input
    setTimeout(() => {
      try { window.dispatchEvent(new Event('resize')); } catch (e) { /* ignore in non-browser env */ }
      try {
        const panels = document.querySelectorAll('mat-expansion-panel');
        const panel = panels[newIndex] as HTMLElement | undefined;
        if (panel) {
          const input = panel.querySelector('[formcontrolname="name"]') as HTMLElement | null;
          if (input && typeof input.focus === 'function') input.focus();
        }
      } catch (e) {
        // ignore DOM errors in non-browser environments
      }
    }, 300);
  }

  removeCampus(index: number) {
    // unsubscribe and remove any per-campus subscriptions and option caches
    try {
      const group = this.campuses.at(index) as FormGroup | null;
      const cid = group?.get('_cid')?.value as string | undefined;
      if (cid && this.campusSubs[cid]) {
        this.campusSubs[cid].unsubscribe();
        delete this.campusSubs[cid];
      }
      if (cid) {
        delete this.campusStateOptions[cid];
        delete this.campusCityOptions[cid];
        delete this.campusLoadingStates[cid];
        delete this.campusLoadingCities[cid];
      }
    } catch (e) { }
    this.campuses.removeAt(index);
  }

  private wireCampusLocationControls(group: FormGroup, cid: string) {
    // ensure initial empty arrays
    this.campusStateOptions[cid] = [];
    this.campusCityOptions[cid] = [];
    this.campusLoadingStates[cid] = false;
    this.campusLoadingCities[cid] = false;

    const sub = new Subscription();

    // when country changes -> load states for this campus
    const countryCtrl = group.get('country');
    const stateCtrl = group.get('state');
    const cityCtrl = group.get('city');

    if (countryCtrl) {
      const s1 = countryCtrl.valueChanges.pipe(
        tap(() => {
          this.campusStateOptions[cid] = [];
          this.campusCityOptions[cid] = [];
          stateCtrl?.setValue('');
          cityCtrl?.setValue('');
          this.campusLoadingStates[cid] = true;
        }),
        switchMap((countryId: string | null) => countryId ? this.locationService.getStatesForCountry(countryId) : of([]))
      ).subscribe(states => {
        this.campusLoadingStates[cid] = false;
        this.campusStateOptions[cid] = states;
        if (states.length === 1) stateCtrl?.setValue(states[0].id);
      });
      sub.add(s1);
    }

    if (stateCtrl) {
      const s2 = stateCtrl.valueChanges.pipe(
        tap(() => {
          this.campusCityOptions[cid] = [];
          cityCtrl?.setValue('');
          this.campusLoadingCities[cid] = true;
        }),
        switchMap((stateId: string | null) => stateId ? this.locationService.getCitiesForState(stateId) : of([]))
      ).subscribe(cities => {
        this.campusLoadingCities[cid] = false;
        this.campusCityOptions[cid] = cities;
        if (cities.length === 1) cityCtrl?.setValue(cities[0].id);
      });
      sub.add(s2);
    }

    this.campusSubs[cid] = sub;
  }

  setPrimaryCampus(index: number) {
    // ensure only one primary
    this.campuses.controls.forEach((ctrl, i) => ctrl.get('isPrimary')?.setValue(i === index));
  }

  ngOnInit(): void {
    // Determine if we're editing by checking for an edit marker in sessionStorage
    try{
      const raw = sessionStorage.getItem('edit_institute');
      if (raw) this.isEditing = true;
    } catch(e) { /* ignore */ }

    // set page title (PageMetaService.setMeta expects a string)
    this.pageMetaService.setMeta(this.isEditing ? 'Edit Institute' : 'Register Institute', this.isEditing ? 'Update the institute details and save changes.' : 'Register a new institute to start creating tests and managing users.');

    // initialize sector options based on any pre-filled industry_type
    const current = this.form.get('industry_type')?.value;
    this.updateSectorOptions(current);

    // update sector options when industry type changes
    this.form.get('industry_type')?.valueChanges.subscribe((val) => {
      this.updateSectorOptions(val);
    });

    // ------- location cascading wiring -------
    // load countries once
    this.locationService.getCountries().subscribe(list => {
      this.countries = list;
      if (list.length === 1) this.form.get('headOffice.country')?.setValue(list[0].id);
    });

    // when country changes -> load states
    this.form.get('headOffice.country')!.valueChanges.pipe(
      tap(() => {
        this.stateOptions = [];
        this.cityOptions = [];
        this.form.get('headOffice.state')!.setValue('');
        this.form.get('headOffice.city')!.setValue('');
        this.loadingStates = true;
      }),
      switchMap((countryId: string | null) => countryId ? this.locationService.getStatesForCountry(countryId) : of([]))
    ).subscribe(states => {
      this.loadingStates = false;
      this.stateOptions = states;
      if (states.length === 1) this.form.get('headOffice.state')!.setValue(states[0].id);
    });

    // when state changes -> load cities
    this.form.get('headOffice.state')!.valueChanges.pipe(
      tap(() => {
        this.cityOptions = [];
        this.form.get('headOffice.city')!.setValue('');
        this.loadingCities = true;
      }),
      switchMap((stateId: string | null) => stateId ? this.locationService.getCitiesForState(stateId) : of([]))
    ).subscribe(cities => {
      this.loadingCities = false;
      this.cityOptions = cities;
      // City is now a free-text input in the Head Office form, so do not auto-fill it from dropdown data.
    });

    // set default subscription dates when creating a new institute
    if (!this.isEditing) {
      try {
        const today = new Date();
        const sixMonths = new Date(today);
        sixMonths.setMonth(sixMonths.getMonth() + 6);
        this.form.get('subscription_start')?.setValue(today as any);
        this.form.get('subscription_end')?.setValue(sixMonths as any);
      } catch (e) { /* ignore date errors */ }
    }
  }

  // Helper to list invalid controls (recursively) for debugging
  get invalidControls(): string[] {
    const out: string[] = [];
    const collect = (ctrl: AbstractControl | null, prefix = '') => {
      if (!ctrl) return;
      // FormGroup / FormArray
      // @ts-ignore - controls is available on groups/arrays
      const controls = (ctrl as any).controls;
      if (controls) {
        for (const name of Object.keys(controls)) {
          const child = controls[name] as AbstractControl;
          const path = prefix ? `${prefix}.${name}` : name;
          if (child.invalid) {
            // if group/array, recurse to get leaf invalid fields, otherwise push the path
            const grand = (child as any).controls;
            if (grand) {
              collect(child, path);
            } else {
              out.push(path);
            }
          }
        }
      }
    };
    collect(this.form, '');
    return out;
  }

  private updateSectorOptions(industry?: string | null) {
    if (industry && industry in this.sectorMap) {
      this.sectorOptions = this.sectorMap[industry];
    } else {
      this.sectorOptions = [];
    }
    // Reset selected sector only when it is not valid for the selected industry.
    const sectorCtrl = this.form.get('industry_sector');
    if (sectorCtrl) {
      const selectedSector = sectorCtrl.value;
      if (selectedSector && this.sectorOptions.includes(selectedSector)) {
        return;
      }

      // If there is exactly one option, auto-select it; otherwise clear the selection.
      if (this.sectorOptions.length === 1) {
        sectorCtrl.setValue(this.sectorOptions[0]);
      } else {
        sectorCtrl.setValue(null);
      }
    }
  }

  goToLocations(stepper: MatStepper) {
    const industryTypeCtrl = this.form.get('industry_type');
    const industrySectorCtrl = this.form.get('industry_sector');

    // Step 2 has custom validation because only these industry fields should block this Next button.
    industryTypeCtrl?.markAsTouched();
    industrySectorCtrl?.markAsTouched();
    industryTypeCtrl?.updateValueAndValidity();
    industrySectorCtrl?.updateValueAndValidity();

    if (industryTypeCtrl?.invalid || industrySectorCtrl?.invalid) return;

    stepper.next();
  }

  onSubmit() {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    // prepare payload: include current user and arrays for department/team/branch
    const currentUserRaw = sessionStorage.getItem('user') || sessionStorage.getItem('user_profile');
    let current_user: any = null;
    try { current_user = currentUserRaw ? JSON.parse(currentUserRaw) : null; } catch (e) { current_user = currentUserRaw || null; }

    const base = this.form.value;
    // prepare payload: remove fields not required by update API and simplify current_user
    const payload: any = {
      // include form values except the removed keys
      ...base,
      // override or remove keys that should not be sent
      country: undefined,
      contact_email: undefined,
      contact_phone: undefined,
      branch: undefined,
      // prefer the explicit arrays maintained by the UI (departmentList/teamList)
      department: this.departmentList.slice(),
      team: this.teamList.slice(),
      // send only current user's id
      current_user: (current_user && (current_user.user_id || current_user.id)) ? (current_user.user_id || current_user.id) : null
    };
    // if editing, include the institute id expected by the update API
    if (this.isEditing && this.editingInstituteId) {
      payload.institute_id = this.editingInstituteId;
    }
    // Send only campus rows that have actual user-entered data; empty rows can make the update fail.
    try {
      payload.campuses = (base.campuses || []).filter((campus: any) =>
        campus.name || campus.address || campus.country || campus.state || campus.city || campus.pincode || campus.email || campus.phone
      );
    } catch(e) { payload.campuses = []; }
    if (this.isEditing) {
      const headOffice: any = base.headOffice || {};
      const hasHeadOffice = Object.values(headOffice).some((value) => !!value);
      if (hasHeadOffice) {
        // Preserve the primary campus row that represents Head Office, otherwise the backend update deletes it.
        payload.campuses = [
          {
            campus_id: this.headOfficeCampusId,
            name: base.short_name || base.name || 'Head Office',
            address: headOffice.address || '',
            country: headOffice.country || '',
            state: headOffice.state || '',
            city: headOffice.city || '',
            pincode: headOffice.pincode || '',
            email: headOffice.email || '',
            phone: headOffice.phone || '',
            isPrimary: true,
            isActive: true
          },
          ...payload.campuses
        ];
      }
    }
    const url = this.isEditing ? `${API_BASE}/update-institute` : `${API_BASE}/register-institute`;
    const headers: any = {};
    const token = sessionStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Convert Date objects to ISO date strings (YYYY-MM-DD) for the API
    try {
      if (payload.subscription_start instanceof Date) payload.subscription_start = payload.subscription_start.toISOString().split('T')[0];
      if (payload.subscription_end instanceof Date) payload.subscription_end = payload.subscription_end.toISOString().split('T')[0];
    } catch (e) { /* ignore conversion errors */ }

    const req$ = this.isEditing ? this.http.put(url, payload, { headers, observe: 'response' }) : this.http.post(url, payload, { headers, observe: 'response' });
    req$.pipe(finalize(() => this.isSubmitting = false)).subscribe({
      next: (res) => {
        const msg = this.isEditing ? 'Institute updated successfully.' : 'Institute registered successfully.';
        this._snack.open(msg, 'Close', { duration: 3500 });
        this.form.reset();
        this.isEditing = false;
        // navigate back to list/view page after success
        try {
          this.router.navigate(['/view-institutes']);
        } catch (e) { /* ignore navigation errors */ }
      },
      error: (err) => {
        console.error('Update institute failed:', err);
        // fallback: store locally and notify
        try { sessionStorage.setItem('institute_new', JSON.stringify(payload)); } catch (e) { }
        const serverMsg = err?.error?.statusMessage || err?.error?.message || err?.message || (this.isEditing ? 'Update failed. Please check server logs.' : 'Register failed. Please check server logs.');
        this._snack.open(serverMsg, 'Close', { duration: 5000 });
      }
    });
  }

  onReset() { this.form.reset(); }

  addDepartment(event: Event) {
    const ke = event as KeyboardEvent;
    if (ke.preventDefault) ke.preventDefault();
    const input = ke.target as HTMLInputElement;
    let raw = input?.value ?? '';
    raw = raw.trim();
    // if user didn't type anything (input shows the CSV), ignore
    if (!raw || raw === this.departmentList.join(', ')) {
      // restore displayed CSV (in case focus cleared it)
      input.value = this.departmentList.join(', ');
      return;
    }
    // support comma-separated paste or multiple entries
    const parts = raw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    for (const p of parts) {
      this.departmentList.push(p);
    }
    this.form.get('department')?.setValue(this.departmentList.join(','));
    input.value = this.departmentList.join(', ');
  }

  removeDepartment(item: string) {
    const idx = this.departmentList.indexOf(item);
    if (idx >= 0) {
      this.departmentList.splice(idx, 1);
      this.form.get('department')?.setValue(this.departmentList.join(','));
    }
  }

  addTeam(event: Event) {
    const ke = event as KeyboardEvent;
    if (ke.preventDefault) ke.preventDefault();
    const input = ke.target as HTMLInputElement;
    let raw = input?.value ?? '';
    raw = raw.trim();
    if (!raw || raw === this.teamList.join(', ')) {
      input.value = this.teamList.join(', ');
      return;
    }
    const parts = raw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    for (const p of parts) {
      this.teamList.push(p);
    }
    this.form.get('team')?.setValue(this.teamList.join(','));
    input.value = this.teamList.join(', ');
  }

  // Handlers for MatChipInputEvent when using matChipInputTokenEnd
  addDepartmentFromChip(event: MatChipInputEvent) {
    const input = event.input;
    const value = (event.value || '').trim();
    if (value) {
      // split comma-separated values if user pasted multiple
      const parts = value.split(',').map(p => p.trim()).filter(p => p.length);
      for (const p of parts) this.departmentList.push(p);
      this.form.get('department')?.setValue(this.departmentList.join(','));
    }
    if (input) input.value = '';
  }

  addTeamFromChip(event: MatChipInputEvent) {
    const input = event.input;
    const value = (event.value || '').trim();
    if (value) {
      const parts = value.split(',').map(p => p.trim()).filter(p => p.length);
      for (const p of parts) this.teamList.push(p);
      this.form.get('team')?.setValue(this.teamList.join(','));
    }
    if (input) input.value = '';
  }

  // Branch handlers
  addBranchFromChip(event: MatChipInputEvent) {
    const input = event.input;
    const raw = (event.value || '').trim();
    if (raw) {
      const parts = raw.split(',').map(p => p.trim()).filter(p => p.length);
      for (const p of parts) {
        // if a department is selected for the branch, prefix it for clarity
        const item = this.selectedBranchDepartment ? `${this.selectedBranchDepartment} - ${p}` : p;
        this.branchList.push(item);
      }
      this.form.get('branch')?.setValue(this.branchList.join(','));
    }
    if (input) input.value = '';
  }

  removeBranch(item: string) {
    const idx = this.branchList.indexOf(item);
    if (idx >= 0) {
      this.branchList.splice(idx, 1);
      this.form.get('branch')?.setValue(this.branchList.join(','));
    }
  }

  removeTeam(item: string) {
    const idx = this.teamList.indexOf(item);
    if (idx >= 0) {
      this.teamList.splice(idx, 1);
      this.form.get('team')?.setValue(this.teamList.join(','));
    }
  }

  // Helpers to resolve location ids/objects to display names for the Review step
  resolveCountryName(value: any): string {
    if (!value) return '-';
    // If it's an object with a name property
    if (typeof value === 'object') {
      return (value.name || value.label || value.country_name || value.country || '').toString() || '-';
    }
    // if it's a string id or name, try to find in countries
    const str = value.toString();
    const found = this.countries.find(c => (c.id && c.id.toString() === str) || (c.name && c.name.toString() === str));
    return found ? (found.name || str) : (str || '-');
  }

  resolveStateName(value: any, cid?: string): string {
    if (!value) return '-';
    if (typeof value === 'object') {
      return (value.name || value.label || value.state_name || value.state || '').toString() || '-';
    }
    const str = value.toString();
    // prefer per-campus state options when available
    if (cid && this.campusStateOptions[cid] && this.campusStateOptions[cid].length) {
      const found = this.campusStateOptions[cid].find(s => (s.id && s.id.toString() === str) || (s.name && s.name.toString() === str));
      if (found) return found.name || str;
    }
    // fallback to global stateOptions
    const found = this.stateOptions.find(s => (s.id && s.id.toString() === str) || (s.name && s.name.toString() === str));
    return found ? (found.name || str) : (str || '-');
  }

  resolveCityName(value: any, cid?: string): string {
    if (!value) return '-';
    if (typeof value === 'object') {
      return (value.name || value.label || value.city_name || value.city || '').toString() || '-';
    }
    const str = value.toString();
    // prefer per-campus city options when available
    if (cid && this.campusCityOptions[cid] && this.campusCityOptions[cid].length) {
      const found = this.campusCityOptions[cid].find(c => (c.id && c.id.toString() === str) || (c.name && c.name.toString() === str));
      if (found) return found.name || str;
    }
    // fallback to global cityOptions
    const found = this.cityOptions.find(c => (c.id && c.id.toString() === str) || (c.name && c.name.toString() === str));
    return found ? (found.name || str) : (str || '-');
  }

  getCampusCountryName(c: AbstractControl | any): string {
    try { return this.resolveCountryName(c?.get('country')?.value); } catch (e) { return '-'; }
  }

  getCampusStateName(c: AbstractControl | any): string {
    try { const cid = c?.get('_cid')?.value; return this.resolveStateName(c?.get('state')?.value, cid); } catch (e) { return '-'; }
  }

  getCampusCityName(c: AbstractControl | any): string {
    try { const cid = c?.get('_cid')?.value; return this.resolveCityName(c?.get('city')?.value, cid); } catch (e) { return '-'; }
  }

  // focus/blur helpers to safely read/write input.value (avoids template EventTarget typing issues)
  onDepartmentFocus(evt: Event) {
    const input = evt?.target as HTMLInputElement | null;
    if (!input) return;
    const csv = (this.departmentList || []).join(', ');
    if (input.value === csv) input.value = '';
  }
  onDepartmentBlur(evt: Event) {
    const input = evt?.target as HTMLInputElement | null;
    if (!input) return;
    if (!input.value || !input.value.trim()) input.value = (this.departmentList || []).join(', ');
  }

  onTeamFocus(evt: Event) {
    const input = evt?.target as HTMLInputElement | null;
    if (!input) return;
    const csv = (this.teamList || []).join(', ');
    if (input.value === csv) input.value = '';
  }
  onTeamBlur(evt: Event) {
    const input = evt?.target as HTMLInputElement | null;
    if (!input) return;
    if (!input.value || !input.value.trim()) input.value = (this.teamList || []).join(', ');
  }
}
