import {
  Controller,
  All,
  Param,
  HttpStatus,
  HttpException,
  HttpService,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { Method } from 'axios';


@Controller()
export class AppController {
  services: {
    [key: string]: string
  }
  constructor(private httpService: HttpService) {
    this.services = {
      cart: process.env.CART_SERVICE_URL,
      product: process.env.PRODUCT_SERVICE_URL,
    }
  }

  @All('/:serviceName')
  async proxy(@Param('serviceName') serviceName, @Req() req: Request) {
    const serviceUrl = this.services[serviceName];
    if (!serviceUrl) {
      throw new HttpException(  'Cannot process request', HttpStatus.BAD_GATEWAY)
    }
    const { method, body, originalUrl } = req;
    const recipientURL = originalUrl.split('/').slice(2).join('/');

    try {
      const { data } = await this.httpService.request({
        url: `${serviceUrl}/${recipientURL}` ,
        method: method as Method,
        data: body,
      }).toPromise();
      return data;
    } catch (err) {
      if (err.isAxiosError) {
        throw new HttpException(err.response.data, err.response.status)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
