import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Administrador } from '../../administrador/entities/administrador.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
// import { Product } from '../../products/entities/product.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['paciente'],
    })
    roles: string[];

    // Relación con Product (sin implementar la entidad completa)
    // @OneToMany(() => Product, (product) => product.user)
    // products: Product[];

    // Relaciones con entidades específicas del sistema médico
    @OneToOne(() => Administrador, (administrador) => administrador.user, { nullable: true })
    administrador?: Administrador;

    @OneToOne(() => Paciente, (paciente) => paciente.user, { nullable: true })
    paciente?: Paciente;

    @OneToOne(() => Doctor, (doctor) => doctor.user, { nullable: true })
    doctor?: Doctor;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
