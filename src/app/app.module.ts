import { NgModule, Provider } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import uaLocale from '@angular/common/locales/ru-UA'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthModule } from './auth/auth.module'
import { TopBarModule } from './shared/modules/top-bar/top-bar.module'
import { GlobalFeedModule } from './global-feed/global-feed.module'
import { YourFeedModule } from './your-feed/your-feed.module'
import { TagFeedModule } from './tag-feed/tag-feed.module'
import { BannerModule } from './shared/modules/banner/banner.module'
import { RegisterEffect } from './auth/store/effects/register.effect'
import { LoginEffect } from './auth/store/effects/login.effect'
import { CurrentUserEffect } from './auth/store/effects/current-user.effect'
import { FeedEffect } from './shared/modules/feed/store/effects/feed.effect'
import { PopularTagsEffect } from './shared/modules/popular-tags/store/effects/popular-tags.effect'
import { AuthInterceptor } from './shared/services/auth-interceptor.service'
import { environment } from '../environments/environment'
import { authReducer } from './auth/store/reducers/auth.reducer'
import { feedReducer } from './shared/modules/feed/store/reducers/feed.reducer'
import { popularTagsReducer } from './shared/modules/popular-tags/store/reducers/popular-tags.reducer'
import { articleReducer } from './article/store/reducers/article.reducer'

registerLocaleData(uaLocale, 'ua')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    BannerModule,
    StoreModule.forRoot({
      router: routerReducer,
      auth: authReducer,
      feed: feedReducer,
      tags: popularTagsReducer,
      article: articleReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      RegisterEffect,
      LoginEffect,
      CurrentUserEffect,
      FeedEffect,
      PopularTagsEffect
    ])
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {}
