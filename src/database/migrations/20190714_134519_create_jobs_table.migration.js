export default class CreateJobsTableMigration {

    async up(schema) {
        await schema.createTable('fusion_jobs', table => {
            table.increments();
            table.string('jobName').notNullable();
            table.text('payload').notNullable();
            table.timestamp('createdAt').notNullable();
            table.timestamp('executedAt');
            table.timestamp('pulledAt');
            table.timestamp('failedAt');
        });
    }

    async down(schema) {
        await schema.dropTable('fusion_jobs');
    }
}
