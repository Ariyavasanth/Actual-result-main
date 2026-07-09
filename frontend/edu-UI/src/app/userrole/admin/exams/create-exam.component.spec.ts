import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/home/service/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { CreateExamComponent } from './create-exam.component';

describe('CreateExamComponent', () => {
  let component: CreateExamComponent;
  let fixture: ComponentFixture<CreateExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExamComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: { user$: of(null), currentUserValue: null } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: PageMetaService, useValue: { setMeta: jasmine.createSpy('setMeta') } },
        { provide: LoaderService, useValue: { show: jasmine.createSpy('show'), hide: jasmine.createSpy('hide') } }
      ]
    }).compileComponents();

    sessionStorage.removeItem('edit_exam');
    fixture = TestBed.createComponent(CreateExamComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    sessionStorage.removeItem('edit_exam');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads saved marks and total marks for randomized edit question banks', () => {
    sessionStorage.setItem('edit_exam', JSON.stringify({
      exam_id: 'exam-1',
      categories: [{
        category_id: 'bank-1',
        category_name: 'Math',
        number_of_questions: 4,
        marks_per_question: 2,
        total_marks: 8,
        randomize_questions: true
      }]
    }));

    component.loadEditTest();

    const category = component.model.categories?.[0] as any;
    expect(category.questions).toBe(4);
    expect(category.marks_per_question).toBe(2);
    expect(category.total_marks).toBe(8);
    expect(component.getCategoryTotalMarks(category)).toBe(8);
  });

  it('calculates total marks during edit initialization when the API omits total marks', () => {
    sessionStorage.setItem('edit_exam', JSON.stringify({
      exam_id: 'exam-2',
      categories: [{
        category: { category_id: 'bank-2', category_name: 'Science', mark_each_question: 3 },
        question_list: [{ question_id: 'q1' }, { question_id: 'q2' }],
        randomize_questions: false
      }]
    }));

    component.loadEditTest();

    const category = component.model.categories?.[0] as any;
    expect(category.questions).toBe(2);
    expect(category.marks_per_question).toBe(3);
    expect(category.total_marks).toBe(6);
    expect(component.getCategoryTotalMarks(category)).toBe(6);
  });
});
