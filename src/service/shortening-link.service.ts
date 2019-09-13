import {Inject, Injectable} from "@nestjs/common";
import * as IORedis from 'ioredis';
import {REDIS_PROVIDER} from "../provider/shortening-link.providers";
import {UnknownShortLinkException} from "../exception/unknown-short-link.exception";
import * as shortId from 'shortid';
import {OutShorteningLinkDTO} from "../dto/out.shortening-link.dto";

@Injectable()
export class ShorteningLinkService {
  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  async shorteningLink(longLink: string, host: string): Promise<OutShorteningLinkDTO> {
    if (longLink.indexOf("http") == -1) {
      longLink = `http://${longLink}`
    }

    const uuid = shortId.generate();
    const longLingOnRedis = await this.redis.get(uuid);

    if (!longLingOnRedis) {
      await this.redis.set(uuid, longLink)
    }
    return {
      shortLink: `http://${host}/${uuid}`
    };
  }

  async getLongLink(uuid: string): Promise<string> {
    const longLink = await this.redis.get(uuid);
    if (!longLink) {
      throw new UnknownShortLinkException();
    }
    return longLink;
  }
}
