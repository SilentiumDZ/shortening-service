import { Module } from '@nestjs/common';
import {ShorteningLinksController} from "./controller/shortening-links.controller";
import {ShorteningLinkService} from "./service/shortening-link.service";
import {appProviders} from "./provider/shortening-link.providers";

@Module({
  imports: [],
  controllers: [ShorteningLinksController],
  providers: [
    ShorteningLinkService,

    ...appProviders,
  ],
})
export class AppModule {}
