import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent} from './components/albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [AppComponent, AlbumsComponent, NavbarComponent, FilterPipe, HeroComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
