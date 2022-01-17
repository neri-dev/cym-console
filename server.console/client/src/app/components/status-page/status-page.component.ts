
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PhishingStatus } from 'src/app/services/status/phishing.status';
import { StatusService } from 'src/app/services/status/status.service';



@Component({
  selector: 'app-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.css']
})
export class StatusPageComponent implements AfterViewInit {

  displayedColumns: string[] = ['email', 'content', 'status'];
  dataSource: MatTableDataSource<PhishingStatus>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  private _subscription: Subscription | undefined;

  //Pagination
  length: number | undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(private status: StatusService, private changeDetectorRefs: ChangeDetectorRef) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {


    this.loadData(null);
  }

  loadData(event: PageEvent | null) {
    this._subscription?.unsubscribe();

    const pageIndex = event?.pageIndex ?? this.pageIndex;
    const pageSize = event?.pageSize ?? this.pageSize;

    const from = pageIndex * pageSize;
    const to = (pageIndex + 1) * pageSize
    this._subscription = this.status.getStatuses(from, to).subscribe(result => {
      this.dataSource.data = result.data;
      this.length = result.totalLength;
      this.changeDetectorRefs.detectChanges();
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
