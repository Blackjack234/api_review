import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/use.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    // filepath: /home/webskitters/workspace/api_review/src/modules/auth/stategy/autn.stategy.ts
    // ...existing code...

    async validate(payload: any) {
        // console.log(payload, "++++++>");
        const { userId, email } = payload;
        // console.log(typeof userId);

        if (!userId) {
            throw new UnauthorizedException('Invalid token payload');
        }

        try {
            const user = await this.userModel.findById(userId);
            // console.log(user, "user+++++>");

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            };
        } catch (error) {
            // console.error('DB query error:', error);
            throw new UnauthorizedException('Database error');
        }
    }

    // ...existing code...
}