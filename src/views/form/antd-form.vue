<template>
    <div class="form-wrap basic-form-wrap">
        <a-form-model ref="myForm" :model="myForm" :rules="formRules">
            <a-form-model-item ref="name" label="姓名" prop="name">
                <a-input
                    v-model="myForm.name"

                />
            </a-form-model-item>
            <a-form-model-item label="类型" prop="type">
                <a-radio-group v-model="myForm.type" @change="handleRadioChange">
                    <a-radio :value="1">
                        A
                    </a-radio>
                    <a-radio :value="2">
                        B
                    </a-radio>
                    <a-radio :value="3">
                        C
                    </a-radio>
                    <a-radio :value="4">
                        D
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="Resources" prop="resource">
                <a-radio-group v-model="myForm.resource">
                    <a-radio value="1">
                        Sponsor
                    </a-radio>
                    <a-radio value="2">
                        Venue
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="Activity zone" prop="region">
                <a-select v-model="myForm.region" placeholder="please select your zone">
                    <a-select-option value="shanghai">
                        Zone one
                    </a-select-option>
                    <a-select-option value="beijing">
                        Zone two
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                    Create
                </a-button>
                <a-button style="margin-left: 10px;" @click="resetForm">
                    Reset
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import 'ant-design-vue/dist/antd.css'
export default {
    name: "antd-form",
    data() {
        return {
            myForm: {
                name: '',
                type: '',
                resource: '',
                region: undefined,
            },
            formRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '3~5字符', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' },
                ],
                resource: [
                    { required: true, message: '请选择资源', trigger: 'change' },
                ],
                region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
            },
        }
    },
    methods: {
        handleRadioChange(e) {
            console.log(53, this.myForm.type);
            console.log(49, e);
        },
        onSubmit() {
            console.log(91, this.$refs.myForm)
            this.$refs.myForm.validate(valid => {
                console.log(valid)
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.myForm.resetFields();
        },
    },
    components: {
    }
}
</script>

<style scoped>

</style>